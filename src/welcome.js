
import {BindingEngine, inject} from 'aurelia-framework';
//import {HttpClient} from 'aurelia-fetch-client';
//import 'fetch';
import {Storage} from './helpers/storage';
import {Swag} from './helpers/swag';
import {BaseConfig} from './helpers/baseconfig';
import {Clone} from './helpers/clone';
import $ from 'jquery';


//@inject(HttpClient, Storage, Swag, ObserverLocator, BaseConfig)
@inject(Swag, BindingEngine, BaseConfig, Clone)

export class Test {

    //constructor(http, storage) {
    constructor(swag, bindingEngine, config, clone) {

        this.swag = swag;
        this.clone = clone;

        //this.storage.set("test", "rippo");

        this.heading = 'Tonights Attendees';

        this.undoAttendeeEnabled = false;
        this.swagEnabled = true;
        this.currentWinner = null;
        this.winnerList = [];
        this.attendeeList = config.current.tempAttendees;
        this.undoAttendeeList = [];


        bindingEngine
            .collectionObserver(this.attendeeList)
            .subscribe(splices => this.attendeeListRemove(splices));
            
        // http.configure(config => {
        //   config
        //     .useStandardConfiguration()
        //     .withBaseUrl('http://localhost:6648/');
        // });
    }

    attendeeListRemove(splices) {
        //TODO Need to check actually if we have a removed splice!
        
        //Get removed item
        var item = this.clone.copy(splices[0].removed[0]);
        //Get random piece of swag
        item.swagThing = this.swag.randomThing();

        //push to winner list
        this.winnerList.push(item);

        //Should swag button be disabled?
        this.swagEnabled = (this.attendeeList.length > 0) && (this.swag.countUnwon() > 0);
    }

    activate() {
        // return this.http.fetch('home/memberlist')
        //   .then(response => response.json())
        //   .then(users => this.attendeeList = users);
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
        this.winnerList = this.winnerList.filter(function (item) {
            return (item !== user);
        });

        this.attendeeList.push(user);
        this.swagEnabled = true;
    }


    undohandler() {
        var user = this.undoAttendeeList.slice(-1).pop();
        this.undoAttendeeList.pop();
        this.attendeeList.push(user);

        if (this.undoAttendeeList.length === 0)
            this.undoAttendeeEnabled = false;
    }
    
    //Selects random winner
    random() {
    
        //get random memberId from attendee list    
        var random = Math.floor(Math.random() * $('#attendeeList .card').length);
        this.attendeeList.splice(random, 1);

    }
};