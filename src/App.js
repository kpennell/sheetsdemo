import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const API = 'https://sheets.googleapis.com/v4/spreadsheets/1mpFIiSlkqU0BQmn5la3nEwkmy3QJUR8SvkaCHJmm6zk/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=AIzaawefNTDOtaFrsIMbKsIJ_E3CxKaTwf0tCaW8';

class App extends Component {

  constructor(){
    super();

    this.state = {
     items:[]
    };

  }

   
  componentDidMount(){

     fetch(API).then(response => response.json()).then(data => {
      let batchRowValues = data.valueRanges[0].values;

      const rows = [];
      for (let i = 1; i < batchRowValues.length; i++) {
        let rowObject = {};
        for (let j = 0; j < batchRowValues[i].length; j++) {
          rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
        }
        rows.push(rowObject);
      }

        this.setState({ items: rows });
        console.log(this.state.items);
    });

  }


  render() {
    const listItems = this.state.items.map((item) =>
    <li>{item.name} at Latitute {item.lat} and Longitude {item.lng} </li>
  );

    return (
      <div>
         <ul>{listItems}</ul>
      </div>
    );
  }
}

export default App;
