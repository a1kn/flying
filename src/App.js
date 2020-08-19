import React, { Component } from 'react';
import './App.css';
import Data from './data.js'
import Table from './components/Table'

class App extends Component {
  formatValue(property, value) {
    if (property === 'airline') {
      return Data.getAirlineById(value)
    } else if (property === 'src' || property === 'dest') {
      return Data.getAirportByCode(value)
    }
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table 
            columns={columns} 
            rows={Data.routes}
            format={this.formatValue}
            perPage={25}
          />
        </section>
      </div>
    );
  }
}

export default App;
