import React, { Component } from 'react';
import './App.css';
import Data from './data.js'
import Table from './components/Table'
import Filter from './components/Filter'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airline: 'all',
      airport: 'all',
    };
  }

  formatValue(property, value) {
    if (property === 'airline') {
      return Data.getAirlineById(value)
    } else if (property === 'src' || property === 'dest') {
      return Data.getAirportByCode(value)
    }
  }

  selectAirline = (id) => {
    if (id === 'all') {
      this.setState({airline: 'all'})
    } else {
      this.setState({airline: +id}) 
    }
  }

  selectAirport = (code) => {
    this.setState({airport: code}) 
  }

  resetFilters = (e) => {
    e.preventDefault()
    this.setState({
      airline: 'all',
      airport: 'all',
    })
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filterRoutesByAirline = Data.routes.filter((route) => {
      return route.airline === this.state.airline || this.state.airline === 'all';
    });

    const filterRoutesByAirport = Data.routes.filter((route) => {
      return route.src === this.state.airport 
        || route.dest === this.state.airport
        || this.state.airport === 'all'
    });

    const filterAirlines = Data.airlines.filter((airline) => {
      return filterRoutesByAirport.some((route) => route.airline === airline.id)
    });

    const filterAirports = Data.airports.filter((airport) => {
      return filterRoutesByAirline.some((route) => route.src === airport.code
        || route.dest === airport.code)
    });

    const selectedRoutes = Data.routes.filter((route) => (
      (route.airline === this.state.airline || this.state.airline === 'all')
      && (route.dest === this.state.airport || route.src === this.state.airport
          || this.state.airport === 'all')
    ));

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Showing routes on 
            <Filter 
              options={filterAirlines}
              value='id'
              onSelect={this.selectAirline}
              default='All Airlines'
            />
            at
            <Filter 
              options={filterAirports}
              value='code'
              onSelect={this.selectAirport}
              default='All Airports'
            />
            <button onClick={this.resetFilters}>
              Reset
            </button>
          </p>
          <Table 
            columns={columns} 
            rows={selectedRoutes}
            format={this.formatValue}
            perPage={25}
          />
        </section>
      </div>
    );
  }
}

export default App;
