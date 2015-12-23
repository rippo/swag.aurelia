import {BindingEngine, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
//import {HttpClient} from 'aurelia-fetch-client';
//import 'fetch';
import {BaseConfig} from './helpers/baseconfig';
import {Clone} from './helpers/clone';
import $ from 'jquery';


@inject(BindingEngine, BaseConfig, Clone, EventAggregator)

export class Attendees {

    //constructor(http, storage) {
    constructor(bindingEngine, config, clone, eventAggregator) {

        this.clone = clone;
        this.eventAggregator = eventAggregator;
        this.eventAggregator.subscribe("swag.clicked", () => this.swagclick());
        this.eventAggregator.subscribe("remove.winner", (user) => this.removeWinner(user));

        //this.storage.set("test", "rippo");

        this.undoAttendeeEnabled = false;
        this.attendeeList = config.current.tempAttendees;
        this.undoAttendeeList = [];


        bindingEngine
            .collectionObserver(this.attendeeList)
            .subscribe(splices => this.attendeeListChange(splices));
            
        // http.configure(config => {
        //   config
        //     .useStandardConfiguration()
        //     .withBaseUrl('http://localhost:6648/');
        // });
    }

    swagclick() {
        //get random memberId from attendee list    
        var random = Math.floor(Math.random() * $('#attendeeList .card').length);
        this.attendeeList.splice(random, 1);
    }

    attendeeListChange(splices) {
        //Need to check actually if we have a removed splice!
        console.log(splices);

        var attendee;

        //If we added an attendee        
        if (splices[0].addedCount > 0) {
            
             attendee = this.attendeeList[splices[0].index];
             this.eventAggregator.publish("put.swag.back", attendee);
  
        }
        else {
        
            //TODO Is it safe to pass around the BOUND data object?
            //  If so we can remove the clone function...
            //Get removed item from the splice, and clone the orginal object
            attendee = this.clone.copy(splices[0].removed[0]);

            //publish the get.random.swag event
            this.eventAggregator.publish("get.random.swag", attendee);
        }
        
        this.eventAggregator.publish("get.count.unwon.swag", attendee);
                 
    }

    removeAttendee(attendee) {
        if (this.undoAttendeeList.length === 0)
            this.undoAttendeeEnabled = true;

        this.undoAttendeeList.push(attendee);

        //remove attendee from list
        //TODO want to remove this filter and favour a linq based approach
        this.attendeeList = this.attendeeList.filter(function (item) {
            return (item.memberId !== attendee.memberId);
        });
    }

    removeWinner(attendee) {
        this.attendeeList.push(attendee);
    }

    undohandler() {
        var attendee = this.clone.copy(this.undoAttendeeList.slice(-1).pop());
        //console.log(attendee);
        this.undoAttendeeList.pop();
                
        this.attendeeList.push(attendee);

        if (this.undoAttendeeList.length === 0)
            this.undoAttendeeEnabled = false;
    }
        
};