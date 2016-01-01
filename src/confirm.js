import {BindingEngine, inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)

export class Confirm {

  constructor(controller){
    //console.log(controller.settings);
    this.controller = controller;
    //this.answer = null;

    controller.settings.lock = false;
    controller.settings.centerHorizontalOnly = false;
  }
  
  activate(message) {
      this.message = message;
  }
}