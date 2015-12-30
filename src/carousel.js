import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Carousel3d} from './helpers/carousel3d';
import {BaseConfig} from './helpers/baseconfig';

@inject(BaseConfig, EventAggregator)


export class Carousel {

    constructor(config, eventAggregator) {
        this.carousel3d = new Carousel3d();

        //console.log(config.current.tempAttendees);
        this.attendeeList = config.current.tempAttendees;
        

        eventAggregator.subscribe("swag.clicked", () => {
            var rndSpin = Math.floor(Math.random() * this.attendeeList.length * 2) + this.attendeeList.length; 
            this.carousel3d.spin(rndSpin)
            //console.log(this.attendeeList[rndSpin % this.attendeeList.length].name);
        });    

    }

    attached() {
        this.carousel3d.start(this.attendeeList.length, "attendeeCarousel");
    }
};