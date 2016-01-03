
export class BaseConfig {

  get current() {
    return this._current;
  }

  constructor() {
    this._current = {
      storage: 'localStorage',
      defaultSwag: [ 
        {item : "T-Shirt",   won: false},
        {item : "Bike",      won: false},
        {item : "Car",       won: false},
        {item : "Girafe", won: false},
        {item : "Mouse",     won: false},
        {item : "Budgie",     won: false},
        {item : "Hamster",     won: false}
      ],
      tempAttendees: [
          { name: 'Ryan O',  image: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg', won:false, swagThing: null },
          { name: 'Rippo W', image: 'https://s3.amazonaws.com/uifaces/faces/twitter/mattsince87/128.jpg', won:false, swagThing: null },
          { name: 'Joe M',   image: 'https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg', won:false, swagThing: null },
          //{ name: 'Paul C',  image: 'https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg', won:false, swagThing: null },
          //{ name: 'Sean F',  image: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg', won:false, swagThing: null }
      ]
    };
  }
}