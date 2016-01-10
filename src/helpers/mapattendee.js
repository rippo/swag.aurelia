import {inject} from 'aurelia-framework';
import {BaseConfig} from './baseconfig';
import {HttpClient} from 'aurelia-fetch-client';


@inject(BaseConfig, HttpClient)


export class MapAttendee {

    constructor(config, http) {
        this.config = config;

        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://meetup.wildesoft.net/')
        });

        this.http = http;

    }

    fill(users) {

        if (this.config.current.attendees.length == 0) {
            var i = 0;
            users.forEach(function (user) {
                this.config.current.attendees.push(
                    {
                        name: user.Member.Name,
                        image: (user.MemberPhoto == null)
                            ? "http://img2.meetupstatic.com/img/2982428616572973604/noPhoto_80.gif" :
                            user.MemberPhoto.PhotoLink,
                        won: false,
                        swagThing: null,
                        position: i++
                    }
                    )
            }, this);
            this.shuffle(this.config.current.attendees);
        }
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



}