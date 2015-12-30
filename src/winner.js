import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Winner {

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.currentWinner = null;
        this.winnerList = [];

        this.eventAggregator.subscribe('add.winner', (winner) => {
            // console.log(attendee);
            this.currentWinner = winner;
        });

        this.eventAggregator.subscribe('add.prize', (swag) => {
            this.currentWinner.swagThing = swag;
            this.winnerList.push(this.currentWinner);
            this.eventAggregator.publish('change.put.back.button.state', true);
        });

    }


    removeWinnerAndSwag(winner) {
        const index = this.winnerList.indexOf(winner);
        this.winnerList.splice(index, 1);

        this.eventAggregator.publish("remove.winner", winner);
        this.eventAggregator.publish('change.swag.button.state', true);
    }

    removeSwag(winner) {
        const index = this.winnerList.indexOf(winner);
        this.winnerList.splice(index, 1);

        this.eventAggregator.publish("remove.swag", winner);
        this.eventAggregator.publish('change.swag.button.state', true);
    }

};
