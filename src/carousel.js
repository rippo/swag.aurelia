
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Carousel3d} from './helpers/carousel3d';
import {BaseConfig} from './helpers/baseconfig';

@inject(BaseConfig, Carousel3d, EventAggregator)


export class Carousel {

    constructor(config, carousel3d, eventAggregator) {
        this.carousel3d = carousel3d;

        console.log(config.current.tempAttendees);
        this.attendeeList = config.current.tempAttendees;

        eventAggregator.subscribe("swag.clicked", () => this.carousel3d.spin());    

    }

    attached() {
        this.carousel3d.start(this.attendeeList.length);
    }
};