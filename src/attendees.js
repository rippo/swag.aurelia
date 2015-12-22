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

        //this.swagEnabled = true;
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
        //console.log(splices);

        //If we add a attendee        
        if (splices[0].addedCount > 0) {
             this.attendeeList[splices[0].index].won = false;
             this.swag.putBack(this.attendeeList[splices[0].index]);
             //this.attendeeList[splices[0].index].swagThing = null;
             //need to put swag back into pot, need to mark user swag thing as null        
        }
        else {
        
            //Get removed item
            var item = this.clone.copy(splices[0].removed[0]);
            //Get random piece of swag
            //item.swagThing = this.swag.randomThing();

            //call random swag event
            this.eventAggregator.publish("get.random.swag", item);
        }
        
        //Should swag button be disabled?
        //this.eventAggregator.publish('change.swag.button.state', 
        //    ((this.attendeeList.length > 0) && (this.swag.countUnwon() > 0)));
         
    }

    removeAttendee(user) {
        if (this.undoAttendeeList.length === 0)
            this.undoAttendeeEnabled = true;

        this.undoAttendeeList.push(user);
        this.attendeeList = this.attendeeList.filter(function (item) {
            return (item !== user);
        });
    }

    removeWinner(user) {
        this.attendeeList.push(user);
    }

    undohandler() {
        var user = this.undoAttendeeList.slice(-1).pop();
        this.undoAttendeeList.pop();
        this.attendeeList.push(user);

        if (this.undoAttendeeList.length === 0)
            this.undoAttendeeEnabled = false;
    }
    
};