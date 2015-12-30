//See http://desandro.github.io/3dtransforms/examples/carousel-02-dynamic.html

import Modernizr from './pastry.kit';
import $ from 'jquery';


export class Carousel3d {

    constructor() {
        this.carousel = null;   
        this.carouselContainer = null;
    }

    spin(spincount) {
            this.carousel.rotation += this.carousel.theta * spincount * -1;
            this.carousel.transform();
    }
    
    won(id) {
        var panel = $('#' + this.carouselContainer + " figure[data-id='" + id +"']");
        panel.css("background-color", "hsla(5, 100%, 50%, 0.7)");

    }

    start(count, carouselContainer) {

        var transformProp = Modernizr.Modernizr.prefixed('transform');

        function Carousel3D(el) {
            this.element = el;

            this.rotation = 0;
            this.panelCount = 0;
            //console.log(this.element.children.length);
            this.totalPanelCount = this.element.children.length;
            this.theta = 0;

            this.isHorizontal = true;

        }
        
        Carousel3D.prototype.won = function(id) {
            var obj = this.carousel;
            console.log(obj);
        }

        Carousel3D.prototype.modify = function () {

            var panel, angle, i, colour;

            this.panelSize = this.element[this.isHorizontal ? 'offsetWidth' : 'offsetHeight'];
            this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
            this.theta = 360 / this.panelCount;

            // do some trig to figure out how big the carousel
            // is in 3D space
            this.radius = Math.round((this.panelSize / 2) / Math.tan(Math.PI / this.panelCount));

            for (i = 0; i < this.panelCount; i++) {
                panel = this.element.children[i];
                angle = this.theta * i;
                panel.style.opacity = 1;
                colour = (angle / 360 * 1.8) + 200 ;
                //panel.style.backgroundColor = 'hsla(' + angle + ', 100%, 50%, 0.7)';
                panel.style.backgroundColor = 'hsla(' + colour + ', 100%, 50%, 0.7)';
                // rotate panel, then push it out in 3D space
                panel.style[transformProp] = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
            }

            // hide other panels
            for (; i < this.totalPanelCount; i++) {
                panel = this.element.children[i];
                panel.style.opacity = 0;
                panel.style[transformProp] = 'none';
            }

            // adjust rotation so panels are always flat
            this.rotation = Math.round(this.rotation / this.theta) * this.theta;

            this.transform();

        };

        Carousel3D.prototype.transform = function () {
            // push the carousel back in 3D space,
            // and rotate it
            this.element.style[transformProp] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
        };

        this.init = function () {

            this.carouselContainer = carouselContainer;
            this.carousel = new Carousel3D(document.getElementById(carouselContainer));

            // populate on startup
            this.carousel.panelCount = count;
            this.carousel.modify();

            setTimeout(function () {
                document.body.addClassName('ready');
            }, 0);

        };

        this.init(count);


    }
};