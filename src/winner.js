import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Winner {

    constructor(eventAggregator) { 
        this.eventAggregator = eventAggregator;
        this.currentWinner = null;
        this.winnerList = [];
        
        this.eventAggregator.subscribe('add.winner', (attendee) => {
            // console.log(attendee);
            this.currentWinner = attendee;
        });
        
        this.eventAggregator.subscribe('add.prize', (swag) => {
            this.currentWinner.swagThing = swag;
            this.winnerList.push(this.currentWinner);
        }); 
         
    }
    
    
    removeWinner(user) {
        this.winnerList = this.winnerList.filter(function (item) {
            return (item !== user);
        });

        this.eventAggregator.publish("remove.winner", user);
        this.eventAggregator.publish('change.swag.button.state', true);
    }
 
};
