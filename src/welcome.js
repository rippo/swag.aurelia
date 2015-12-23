
import {BindingEngine, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
//import {HttpClient} from 'aurelia-fetch-client';
//import 'fetch';
import {Storage} from './helpers/storage';
import {BaseConfig} from './helpers/baseconfig';
import {Clone} from './helpers/clone';
import $ from 'jquery';


//@inject(HttpClient, Storage, Swag, ObserverLocator, BaseConfig)
@inject(BindingEngine, BaseConfig, Clone, EventAggregator)

export class Welcome {

    //constructor(http, storage) {
    constructor(bindingEngine, config, clone, eventAggregator) {

        //this.swag = swag;
        this.clone = clone;
        this.eventAggregator = eventAggregator;

        //this.storage.set("test", "rippo");

        this.swagEnabled = true;


        this.eventAggregator.subscribe('change.swag.button.state', (state) => this.swagEnabled = state);
        this.eventAggregator.subscribe('count.unwon.swag.is', (count) => this.swagEnabled = (count > 0));
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

    
    //Selects random winner
    random() {
        this.eventAggregator.publish("swag.clicked");    
    }
    
};