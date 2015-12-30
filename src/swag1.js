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
        this.lastWin = null;
        this.spinCount = null;
        

        //TODO is pub/sub correct way to call into these functions?
        //  Suppose if I inect Swag on attendees then I am tight coupling
        //  This does loosly couple but becomes an event driven system! Good or Bad?
        this.eventAggregator.subscribe("get.random.swag", (winner) => this.getRandomSwag(winner));
        this.eventAggregator.subscribe("put.swag.back", (winner) => this.putSwagBack(winner));
        this.eventAggregator.subscribe("get.count.unwon.swag", () => this.countUnwonSwag());
        
        //TODO move to function
        eventAggregator.subscribe("swag.clicked", () => {
            this.spinCount = Math.floor(Math.random() * this.swagList.length) + this.swagList.length;
            this.lastWin = this.swagList[this.spinCount % this.swagList.length];
            this.carousel3d.spin(this.swagList.length);
            this.spinCount--;
        });
    
    }

    attached() {
        this.carousel3d.start(this.swagList.length, "swagCarousel");

        //trigger when transition ended
        var transEndEventName = ('WebkitTransition' in document.documentElement.style) ? 'webkitTransitionEnd' : 'transitionend';

        document.getElementById("swagCarousel").addEventListener(transEndEventName , (event) => {
            if (this.spinCount > 0) {
                this.carousel3d.spin(this.swagList.length);
                this.spinCount --;
            } else {
                console.log("Swag carousel ended, last win is " + this.lastWin.item, this.lastWin.id );
                this.carousel3d.won(this.lastWin.id);    
            }
        });                
    }

    getRandomSwag(winner) {
        
        console.log("get random swag");

        //get swag not won
        var swagList = this.swagList.filter(function (a) {
            return (a.won === false)
        });

        //random swag index
        var random = Math.floor(Math.random() * swagList.length);
 
        //get swag thing and set it as won
        var swagThing = swagList[random];
        //console.log(swagThing.item);
        swagList[random].won = true;

        winner.swagThing = swagThing;

        this.eventAggregator.publish('add.winner', winner);

    }

    putSwagBack(winner) {
        //TODO want to remove this filter and favour a linq based approach
        var swagItem = this.swagList.filter(function (a) {
            return (a.id === winner.swagThing.id)
        })[0];

        swagItem.won = false;
        winner.won = false;
        winner.swagThing = null;
    }

    countUnwonSwag() {
        var swagList = this.swagList.filter(function (a) {
            return (a.won === false)
        });
        this.eventAggregator.publish('count.unwon.swag.is', swagList.length);
    }

}