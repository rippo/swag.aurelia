import {inject} from 'aurelia-framework';
import {BaseConfig} from './baseConfig';

@inject(BaseConfig)

export class Swag {

  constructor(config) {
    this.config = config;
  }
  

  randomThing() {

    //console.log("swagging...")

    this.config.current.defaultSwag.forEach(function(element) {
        console.log(element.item, element.won);
    }, this);  
    
    //get swag not won
    var swagList  = this.config.current.defaultSwag.filter(function(a){ 
        return (a.won === false)
    });

    //console.log("swaglist len", swagList.length);
 
    //random swag index
    var random = Math.floor(Math.random() * swagList.length);

    //console.log("random", random);
 
    //get swag thing and set it as won
    var swagThing = swagList[random];
    //console.log(swagThing.item);
    swagList[random].won = true;

    //console.log(this.config.current.defaultSwag);

    return swagThing;
  }
  
  countUnwon() {
    var swagList  = this.config.current.defaultSwag.filter(function(a){ 
        return (a.won === false)
    });
    //console.log(swagList.length);
    return swagList.length;
  }

}