import {inject} from 'aurelia-framework';
import {BaseConfig} from './helpers/baseConfig';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Carousel3d} from './helpers/carousel3d';

@inject(BaseConfig, EventAggregator)

export class Swag {

    constructor(config, eventAggregator) {
        this.config = config;
        this.eventAggregator = eventAggregator;
        this.swagList = this.config.current.defaultSwag;
        this.carousel3d = new Carousel3d();
        this.lastWinPosition = 0;
        this.lastPrize = null;
        
        //Auto position, saves us looping later on....
        for(var i=0; i <this.swagList.length; i++)
            this.swagList[i].position = i;
        

        //TODO is pub/sub correct way to call into these functions?
        //  Suppose if I inect Swag on attendees then I am tight coupling
        //  This does loosly couple but becomes an event driven system! Good or Bad?
        eventAggregator.subscribe("swag.clicked", () => { this.swagClicked()});
        eventAggregator.subscribe("remove.winner", (winner) => { this.removeSwag(winner);});
        eventAggregator.subscribe("remove.swag", (winner) => { this.removeSwag(winner);});
 
    }
    
    swagClicked() {
        this.eventAggregator.publish('change.swag.button.state', false);
        
        var nextSwagWon = this.getRandomSwag();
        
        if (nextSwagWon !== null) {
            var spin = 0, extraSpins = this.swagList.length * 3;
            
            this.lastPrize = nextSwagWon;

            spin = this.lastWinPosition - nextSwagWon.position; 
            
            //we are on the win already so just spin it a few times
            if (spin !== 0) {
                spin = Math.abs(spin); //make it postive 
                spin = nextSwagWon.position - this.lastWinPosition + extraSpins;
            } else {
                spin = extraSpins;
            }
            
            
            this.lastWinPosition = nextSwagWon.position;
            //console.log(spin, this.lastWinPosition, nextSwagWon.item, nextSwagWon.position);
            this.carousel3d.spin(spin);   
            
        }
    }

    removeSwag(winner) {
        this.carousel3d.putback(winner.swagThing.position);
        //console.log(winner.swagThing.position);
        this.swagList[winner.swagThing.position].won = false;
    }
    

    attached() {
        this.carousel3d.start(this.swagList.length, "swagCarousel");

        //trigger when transition ended
        var transEndEventName = ('WebkitTransition' in document.documentElement.style) ? 'webkitTransitionEnd' : 'transitionend';

        document.getElementById("swagCarousel").addEventListener(transEndEventName , (event) => {
                //console.log("Swag carousel ended, last win is " + this.lastWin.item, this.lastWin.id );
                this.carousel3d.won(this.lastWinPosition);
                this.eventAggregator.publish('add.prize', this.lastPrize);    
                this.countUnwonSwag();    
        });                
    }

    getRandomSwag() {
        
        //console.log("get random swag");

        //get swag not won
        var swagList = this.swagList.filter(function (a) {
            return (a.won === false)
        });

        if (swagList.length === 0) 
            return null;

        //random swag index
        var randomIndex = Math.floor(Math.random() * swagList.length);

        //randomIndex = 0;
 
        //get swag thing and set it as won
        var swagThing = swagList[randomIndex];
        swagList[randomIndex].won = true;

        //winner.swagThing = swagThing;

        //this.eventAggregator.publish('add.winner', winner);

        //console.log(swagList.length, randomIndex);

        return swagThing;

    }

    // putSwagBack(winner) {
    //     //TODO want to remove this filter and favour a linq based approach
    //     var swagItem = this.swagList.filter(function (a) {
    //         return (a.id === winner.swagThing.id)
    //     })[0];

    //     swagItem.won = false;
    //     winner.won = false;
    //     winner.swagThing = null;
    // }

    countUnwonSwag() {
        var swagList = this.swagList.filter(function (a) {
            return (a.won === false)
        });

        if (swagList.length === 0) 
            this.eventAggregator.publish('no.winners.or.swag.left', true);
        else
            this.eventAggregator.publish('change.swag.button.state', true);
    }

}