import {inject} from 'aurelia-framework';
import {BaseConfig} from './helpers/baseConfig';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Carousel3d} from './helpers/carousel3d';

@inject(BaseConfig, EventAggregator)

export class Swag1 {

    constructor(config, eventAggregator) {
        this.config = config;
        this.eventAggregator = eventAggregator;
        this.swagList = this.config.current.defaultSwag;
        this.carousel3d = new Carousel3d();
        this.lastWinPosition = 0;
        
        //Auto position, saves us looping later on....
        for(var i=0; i <this.swagList.length; i++)
            this.swagList[i].position = i;
        
        

        //TODO is pub/sub correct way to call into these functions?
        //  Suppose if I inect Swag on attendees then I am tight coupling
        //  This does loosly couple but becomes an event driven system! Good or Bad?
        //this.eventAggregator.subscribe("get.random.swag", (winner) => this.getRandomSwag(winner));
        //this.eventAggregator.subscribe("put.swag.back", (winner) => this.putSwagBack(winner));
        //this.eventAggregator.subscribe("get.count.unwon.swag", () => this.countUnwonSwag());
        
        //TODO move to function
        eventAggregator.subscribe("swag.clicked", () => {
           var nextSwagWon = this.getRandomSwag();
           
           if (nextSwagWon !== null) {
               var spin = 0, extraSpins = this.swagList.length * 3;

               spin = this.lastWinPosition - nextSwagWon.position; 
             
               //we are on the win already so just spin it a few times
               if (spin !== 0) {
                   spin = Math.abs(spin); //make it postive 
                   spin = nextSwagWon.position - this.lastWinPosition + extraSpins;
               } else {
                   spin = extraSpins;
               }
              
             
             this.lastWinPosition = nextSwagWon.position;
             console.log(spin, this.lastWinPosition, nextSwagWon.item, nextSwagWon.position);
             this.carousel3d.spin(spin);   
                
           }
           
            
           //this.lastWin = this.swagList[index];
           //this.carousel3d.spin(this.swagList.length);
           //this.spinCount--;
        });
    
    }

    attached() {
        this.carousel3d.start(this.swagList.length, "swagCarousel");

        //trigger when transition ended
        var transEndEventName = ('WebkitTransition' in document.documentElement.style) ? 'webkitTransitionEnd' : 'transitionend';

        document.getElementById("swagCarousel").addEventListener(transEndEventName , (event) => {
                //console.log("Swag carousel ended, last win is " + this.lastWin.item, this.lastWin.id );
                this.carousel3d.won(this.lastWinPosition);    
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

    // countUnwonSwag() {
    //     var swagList = this.swagList.filter(function (a) {
    //         return (a.won === false)
    //     });
    //     this.eventAggregator.publish('count.unwon.swag.is', swagList.length);
    // }

}