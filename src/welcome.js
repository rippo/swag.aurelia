import {BindingEngine, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DialogService} from 'aurelia-dialog';
import {Confirm} from './confirm';
import {Storage} from './helpers/storage';
import {BaseConfig} from './helpers/baseconfig';
import {Clone} from './helpers/clone';
import $ from 'jquery';


@inject(BindingEngine, BaseConfig, Clone, EventAggregator, DialogService)

export class Welcome {

    constructor(bindingEngine, config, clone, eventAggregator, dialogService) {

        //this.swag = swag;
        this.clone = clone;
        this.eventAggregator = eventAggregator;
        this.dialogService = dialogService;

        //this.storage.set("test", "rippo");

        this.swagEnabled = true;
        this.noSwagOrAttendeesLeft = false;

        this.eventAggregator.subscribe('change.swag.button.state', (state) => {
            if (!this.noSwagOrAttendeesLeft)
                this.swagEnabled = state
        });

        this.eventAggregator.subscribe('no.winners.or.swag.left', (state) => {
            this.noSwagOrAttendeesLeft = state;
            this.swagEnabled = !state;
        });

    }

    reset() {
        this.dialogService.open({ viewModel: Confirm, model: 'Are you sure you want to reset?' }).then(response => {
            if (!response.wasCancelled) {
                self.location.href = "/";
            }
        });
    }
    
    //Selects random winner
    random() {
        this.eventAggregator.publish("swag.clicked");
    }

};