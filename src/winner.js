import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Winner {

    constructor(eventAggregator) { 
        this.ea = eventAggregator;
        this.currentWinner = null;
        this.winnerList = [];
        
        this.ea.subscribe('add.winner', (item) => {
            console.log(item);
            this.winnerList.push(item);
        }); 
    }
    
    
    removeWinner(user) {
        this.winnerList = this.winnerList.filter(function (item) {
            return (item !== user);
        });

        this.attendeeList.push(user);
        this.swagEnabled = true;
    }
 
};
