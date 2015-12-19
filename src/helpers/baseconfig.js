
export class BaseConfig {

  get current() {
    return this._current;
  }

  constructor() {
    this._current = {
      storage: 'localStorage',
      defaultSwag: [ 
        {item : "T-Shirt", won: false},
        {item : "Bike", won: false},
        {item : "Car", won: false}
      ],
      tempAttendees: [
          { name: 'Ryan O', memberId: 100, image: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg' },
          { name: 'Rippo W', memberId: 101, image: 'https://s3.amazonaws.com/uifaces/faces/twitter/mattsince87/128.jpg' },
          { name: 'Joe M', memberId: 102, image: 'https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg' },
          { name: 'Paul C', memberId: 103, image: 'https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg' },
          { name: 'Sean F', memberId: 104, image: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg' }
      ]
    };
  }
}