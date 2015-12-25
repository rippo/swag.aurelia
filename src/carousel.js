
import {inject} from 'aurelia-framework';
import {Carousel3d} from './helpers/carousel3d';

@inject(Carousel3d)


export class Carousel {

    constructor(carousel3d) {
        this.carousel3d = carousel3d;
    }

    attached() {
        this.carousel3d.start();
    }
};