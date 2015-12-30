import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Carousel3d} from './helpers/carousel3d';
import {BaseConfig} from './helpers/baseconfig';

@inject(BaseConfig, EventAggregator)


export class Attendees {

    constructor(config, eventAggregator) {
        this.carousel3d = new Carousel3d();
        this.lastWinPosition = 0;
        this.eventAggregator = eventAggregator;

        //console.log(config.current.tempAttendees);
        this.attendeeList = this.shuffle(config.current.tempAttendees);
        
        //Auto position, saves us looping later on....
        for (var i = 0; i < this.attendeeList.length; i++)
            this.attendeeList[i].position = i;


        eventAggregator.subscribe("swag.clicked", () => {
            var nextAttendeeWon = this.getRandomWinner();

            if (nextAttendeeWon !== null) {

                this.eventAggregator.publish('add.winner', nextAttendeeWon);

                var spin = 0, extraSpins = this.attendeeList.length * 3;

                spin = this.lastWinPosition - nextAttendeeWon.position; 
             
                //we are on the win already so just spin it a few times
                if (spin !== 0) {
                    spin = Math.abs(spin); //make it postive 
                    spin = nextAttendeeWon.position - this.lastWinPosition + extraSpins;
                } else {
                    spin = extraSpins;
                }


                this.lastWinPosition = nextAttendeeWon.position;
                console.log(spin, this.lastWinPosition, nextAttendeeWon.name, nextAttendeeWon.position);
                this.carousel3d.spin(spin);

            }
        });

    }

    attached() {
        this.carousel3d.start(this.attendeeList.length, "attendeeCarousel");
        
        //trigger when transition ended
        var transEndEventName = ('WebkitTransition' in document.documentElement.style) ? 'webkitTransitionEnd' : 'transitionend';

        document.getElementById("attendeeCarousel").addEventListener(transEndEventName, (event) => {
            console.log("attendee carousel ended, last winner is " + this.lastWinPosition);
            this.carousel3d.won(this.lastWinPosition);
        });

    }


    getRandomWinner() {
        
        //console.log("get random swag");

        //get swag not won
        var attendeeList = this.attendeeList.filter(function (a) {
            return (a.won === false)
        });

        if (attendeeList.length === 0)
            return null;

        //random swag index
        var randomIndex = Math.floor(Math.random() * attendeeList.length);

        //randomIndex = 0;
 
        //get swag thing and set it as won
        var winner = attendeeList[randomIndex];
        attendeeList[randomIndex].won = true;

        //winner.swagThing = swagThing;

        //this.eventAggregator.publish('add.winner', winner);

        //console.log(swagList.length, randomIndex);

        return winner;

    }

    shuffle(array) {
        var counter = array.length, temp, index;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

};