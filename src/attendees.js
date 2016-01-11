import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Carousel3d} from './helpers/carousel3d';
import {MapAttendee} from './helpers/mapattendee';
import {BaseConfig} from './helpers/baseconfig';
import {HttpClient} from 'aurelia-fetch-client';

@inject(BaseConfig, HttpClient, EventAggregator, MapAttendee)


export class Attendees {

    constructor(config, http, eventAggregator, mapAttendee) {

        this.eventAggregator = eventAggregator;
        this.config = config;
        this.mapAttendee = mapAttendee;
        this.loading = true;

        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://meetup.wildesoft.net/')
        });
        this.http = http;

        this.carousel3d = new Carousel3d(this.eventAggregator);
        this.lastWinPosition = 0;
        
        this.attendeeList = [];

        eventAggregator.subscribe("swag.clicked", () => {
            if (this.loading) {
                this.loading = false;
                eventAggregator.publish("carousel.rendered");
            }
            
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
                //console.log(spin, this.lastWinPosition, nextAttendeeWon.name, nextAttendeeWon.position);
                this.carousel3d.spin(spin);

            }
        });

        eventAggregator.subscribe("remove.winner", (winner) => {
            this.carousel3d.putback(winner.position);
            this.attendeeList[winner.position].won = false;
            this.attendeeList[winner.position].swagThing = null;
        });

        eventAggregator.subscribe("carousel.rendered", () => {
            //trigger when transition ended
            var transEndEventName = ('WebkitTransition' in document.documentElement.style) ? 'webkitTransitionEnd' : 'transitionend';

            document.getElementById("attendeeCarousel").addEventListener(transEndEventName, (event) => {
                //console.log("attendee carousel ended, last winner is " + this.lastWinPosition);
                this.carousel3d.won(this.lastWinPosition);
                this.countUnwonAttendees();
            });
        })

    }

    attached() {

        if (this.config.current.attendees.length == 0) {

            return this.http.fetch('api/attendees')
                .then(response => response.json())
                .then(users => {
                    this.mapAttendee.fill(users);

                    this.attendeeList = this.config.current.attendees;
                    
                    //it takes a small amount of time to render the attendess list. would love a callback to know
                    //  when rendering has completed! 
                    setTimeout(() => {
                        this.carousel3d.start(this.attendeeList.length, "attendeeCarousel");
                    }, 5);

                });
        }

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

    countUnwonAttendees() {
        var list = this.attendeeList.filter(function (a) {
            return (a.won === false)
        });

        //console.log(list.length);

        if (list.length === 0)
            this.eventAggregator.publish('no.winners.or.swag.left', true);
        else
            this.eventAggregator.publish('change.swag.button.state', true);
    }

};