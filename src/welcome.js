/*
Would like to change the observerLocator to the BindingEngin but initially I couldnlt get it to work
http://stackoverflow.com/questions/30283569/array-subscription-in-aurelia/30286225#comment56507826_30286225
*/

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
    this.clone = clone;
    
    //this.storage.set("test", "rippo");
 
    
    this.heading = 'Tonights Attendees';

    this.undoAttendeeEnabled = false;
    this.swagEnabled = true;
    this.currentWinner = null;
    this.winnerList = [];
    this.attendeeList = config.current.tempAttendees;
    this.undoAttendeeList = [];

    // subscribe
    
    observerLocator
      .getArrayObserver(this.attendeeList)
      .subscribe(splices => {
          //Get removed item
          var item = this.clone.copy(splices[0].removed[0]);
          //Get random piece of swag
          item.swagThing = this.swag.randomThing();

          //push to winner list
          this.winnerList.push(item);

          //Should swag button be disabled?
          this.swagEnabled = (this.attendeeList.length > 0) && (this.swag.countUnwon() > 0);

      });

//  
      // let subscription = bindingEngine.collectionObserver(this.attendeeList)
      //.subscribe(splices => console.log(splices));

    // unsubscribe
    //subscription.dispose();
 
//     var subscription = bindingEngine.collectionObserver(this.attendeeList)
//       .subscribe(
//           splices =>  {
//               console.log(clone);
//               console.log(splices);
//           }
//       );
// 
//     // unsubscribe
//     subscription.dispose();    



    // http.configure(config => {
    //   config
    //     .useStandardConfiguration()
    //     .withBaseUrl('http://localhost:6648/');
    // });
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
 
  }
};