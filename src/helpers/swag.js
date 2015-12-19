import {inject} from 'aurelia-framework';
import {BaseConfig} from './baseConfig';

@inject(BaseConfig)

export class Swag {

  constructor(config) {
    this.config = config ;
  }


  random() {
    
    //get swag not won
    var unusedSwagList = this.config.current.defaultSwag.filter(function(a){ return !a.won});
 
    //random swag index
    var random = Math.floor(Math.random() * unusedSwagList.length);
 
    //get swag thing and set it as won
    var swagThing = unusedSwagList[random];
    this.config.current.defaultSwag[random].won = true;

    return swagThing;
  }

}