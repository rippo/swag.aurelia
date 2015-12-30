
export class BaseConfig {

  get current() {
    return this._current;
  }

  constructor() {
    this._current = {
      storage: 'localStorage',
      defaultSwag: [ 
        {item : "T-Shirt", won: false, id: 1892},
        {item : "Bike", won: false, id: 1891},
        {item : "Car", won: false, id: 1723},
        {item : "T-shirt 2", won: false, id: 1724}
      ],
      tempAttendees: [
          { name: 'Ryan O', id: 100, image: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg', won:false, swagThing: null },
          { name: 'Rippo W', id: 101, image: 'https://s3.amazonaws.com/uifaces/faces/twitter/mattsince87/128.jpg', won:false, swagThing: null },
          { name: 'Joe M', id: 102, image: 'https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg', won:false, swagThing: null },
          { name: 'Paul C', id: 103, image: 'https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg', won:false, swagThing: null },
          { name: 'Sean F', id: 104, image: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg', won:false, swagThing: null }
      ]
    };
  }
}