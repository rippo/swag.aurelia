import {ObserverLocator, inject} from 'aurelia-framework';
//import {HttpClient} from 'aurelia-fetch-client';
//import 'fetch';
import {Storage} from './helpers/storage';
import {Swag} from './helpers/swag';
import {BaseConfig} from './helpers/baseconfig';
import {Clone} from './helpers/clone';
import $ from 'jquery';


//@inject(HttpClient, Storage, Swag, ObserverLocator, BaseConfig)
@inject(Swag, ObserverLocator, BaseConfig, Clone)

export class Test {

  //constructor(http, storage, swag, observerLocator, config) {
  constructor(swag, observerLocator, config, clone) {
    
    //this.http = http;
    //this.storage = storage;
    this.swag = swag;
    this.observerLocator = observerLocator; 
    this.clone = clone;
    
    //this.storage.set("test", "rippo");
 
    
    this.heading = 'Tonights Attendees';

    this.undoAttendeeEnabled = false;
    this.swagEnabled = true;
    this.currentWinner = null;
    this.winnerList = [];
    //  this.attendeeList = [];
    this.undoAttendeeList = [];
    this.attendeeList = config.current.tempAttendees;


    let subscribeToArray = this.observerLocator.getArrayObserver(this.attendeeList);
    subscribeToArray.subscribe(this.listChanged);
    

    // http.configure(config => {
    //   config
    //     .useStandardConfiguration()
    //     .withBaseUrl('http://localhost:6648/');
    // });
  }

  listChanged(splices) {
    var winner = this.clone.copy(splices[0].removed[0]);
    console.log(winner);
    this.winnerList.push(winner);
  }

  activate() {
    // return this.http.fetch('home/memberlist')
    //   .then(response => response.json())
    //   .then(users => this.attendeeList = users);
  }


  removeAttendee(user) {
    if (this.undoAttendeeList.length === 0)
      this.undoAttendeeEnabled = true;
    
    
    //this.undoAttendeeList.splice(index, 1, user)
    
    this.undoAttendeeList.push(user);
    this.attendeeList = this.attendeeList.filter(function(item) {
      return (item !== user);
    });
  }

  removeWinner(user) {
    this.winnerList = this.winnerList.filter(function(item) {
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
    //var memberId = this.attendeeList[random].MemberId;

    //set as current user
    //var winner = this.attendeeList.filter(function(a){ return a.MemberId == memberId })[0];
    //this does not work as intended!
    //winner.swagThing = this.swag.random();
    //winner.wonSwag = true;
    //this.currentWinner = winner;

    //push attendee to winner list
    //this.winnerList.push(this.currentWinner);

    //remove user from attendee list    
    //this.attendeeList = this.attendeeList.filter(function(item) {
    // return (item.MemberId !== memberId);
    //});

    //disable button if we have no one left to give swag to    
    //this.swagEnabled = this.attendeeList.length > 0;
    
  }
};