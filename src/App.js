import React, { Component } from 'react';
import './App.css';
import Data from './data.js'
import Table from './components/Table'


const getRoutes = (
  Data.routes.map((route) => {
    const airlineName = Data.getAirlineById(route.airline);
    const srcName = Data.getAirportByCode(route.src);
    const destName = Data.getAirportByCode(route.dest);

    return {
      airline: airlineName,
      src: srcName,
      dest: destName,
    }
  })
);

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table routes={getRoutes} />
        </section>
      </div>
    );
  }
}

export default App;
