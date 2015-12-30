import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
//import {HttpClient} from 'aurelia-fetch-client';
//import 'fetch';
import {BaseConfig} from './helpers/baseconfig';
import {Clone} from './helpers/clone';
import $ from 'jquery';


@inject(BaseConfig, Clone, EventAggregator)

export class Attendees {

    constructor(config, clone, eventAggregator) {

        this.clone = clone;
        this.eventAggregator = eventAggregator;
        //this.eventAggregator.subscribe("swag.clicked", () => this.swagclick());
        this.eventAggregator.subscribe("remove.winner", (user) => this.removeWinner(user));

        //this.storage.set("test", "rippo");

        this.undoAttendeeEnabled = false;
        //console.log(config.current.tempAttendees);
        this.attendeeList = config.current.tempAttendees;
        this.undoAttendeeList = [];

        // http.configure(config => {
        //   config
        //     .useStandardConfiguration()
        //     .withBaseUrl('http://localhost:6648/');
        // });
    }

    swagclick() {
        console.log($('#attendeeList .card').length);
        //get random card from attendee list    
        var random = Math.floor(Math.random() * $('#attendeeList .card').length);
        
        var attendee = this.attendeeList.splice(random, 1)[0];
        var clone = this.clone.copy(attendee);
        this.eventAggregator.publish("get.random.swag", clone);
        this.eventAggregator.publish("get.count.unwon.swag");
    }

    removeAttendee(attendee) {
        //shouls we enable the undo button
        if (this.undoAttendeeList.length === 0)
            this.undoAttendeeEnabled = true;

        //push to undo stack
        this.undoAttendeeList.push(attendee);

        //remove attendee from list
        this.attendeeList.splice(this.attendeeList.indexOf(attendee), 1);

    }

    removeWinner(attendee) {
        //console.log("remove winner");
        this.attendeeList.push(attendee);
        this.eventAggregator.publish("put.swag.back", attendee);
    }

    undohandler() {
        //pop back into attendee list
        var attendee = this.undoAttendeeList.pop();
        
        this.attendeeList.push(attendee);
        
        //disable undo button if no more undos left on stack
        if (this.undoAttendeeList.length === 0)
            this.undoAttendeeEnabled = false;
    }
        
};