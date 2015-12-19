import {bindable, decorators} from 'aurelia-framework';

export let NavBar = decorators(bindable('router')).on(class {
  constructor() {
    this.router = null;
  }
});