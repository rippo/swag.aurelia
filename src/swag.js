import {inject} from 'aurelia-framework';
import {BaseConfig} from './helpers/baseConfig';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(BaseConfig, EventAggregator)

export class Swag {

    constructor(config, eventAggregator) {
        this.config = config;
        this.eventAggregator = eventAggregator;
        this.swagList = this.config.current.defaultSwag;

        this.eventAggregator.subscribe("get.random.swag", (item) => this.randomThing(item));

    }


    randomThing(item) {

        //console.log("swagging...")

        // this.config.current.defaultSwag.forEach(function(element) {
        //     console.log(element.item, element.won);
        // }, this);  
    
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


        item.swagThing = swagThing;

        this.eventAggregator.publish('add.winner', item);

    }

    putBack(item) {

        console.log(item.swagThing.id);

        var swagItem = this.swagList.filter(function (a) {
            return (a.id === item.swagThing.id)
        })[0];

        swagItem.won = false;
    
        //this.config.current.defaultSwag
    }

    countUnwon() {
        var swagList = this.swagList.filter(function (a) {
            return (a.won === false)
        });
        //console.log(swagList.length);
        return swagList.length;
    }

}