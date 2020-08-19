import React, { Component } from 'react';
import './App.css';
import Data from './data.js'
import Table from './components/Table'
import Filter from './components/Filter'
import Map from './components/Map'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airline: 'all',
      airport: 'all',
      page: 1,
    };
  }

  prevClick = (e) => {
    e.preventDefault()  
    this.setState({page: this.state.page - 1})
  }

  nextClick = (e) => {
    e.preventDefault() 
    this.setState({page: this.state.page + 1})
  }

  airportClick = (code) => {
    this.selectAirport(code)
    this.selectAirline('all')
  }

  formatValue(property, value) {
    if (property === 'airline') {
      return Data.getAirlineById(value)
    } else if (property === 'src' || property === 'dest') {
      return Data.getAirportByCode(value)
    }
  }

  selectAirline = (id) => {
    this.setState({page: 1})

    if (id === 'all') {
      this.setState({airline: 'all'})
    } else {
      this.setState({airline: +id}) 
    }
  }

  selectAirport = (code) => {
    this.setState({airport: code, page: 1}) 
  }

  resetFilters = (e) => {
    e.preventDefault()
    this.setState({
      airline: 'all',
      airport: 'all',
    })
  }

  sortByName = (a, b) => {
    if (a.name > b.name) {
      return 1
    } else if (b.name > a.name) {
      return -1
    }
    return 0
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

    const filterAirlines = Data.airlines.map((airline) => {
      const count = filterRoutesByAirport.filter((route) =>
        route.airline === airline.id
      ).length

      if (count > 0) {
        return {
          id: airline.id,
          name: airline.name,
          count,
        };
      } else {
        return {
          id: airline.id,
          name: airline.name,
          disabled: true,
        }
      }
    }).sort(this.sortByName);

    const filterAirports = Data.airports.map((airport) => {
      const count = filterRoutesByAirline.filter((route) => 
        route.src === airport.code || route.dest === airport.code
      ).length

      if (count > 0) {
        return {
          name: airport.name,
          code: airport.code,
          count,
        };
      } else {
        return {
          name: airport.name,
          code: airport.code,
          disabled: true,
        }
      }
    }).sort(this.sortByName);

    const selectedRoutes = Data.routes.filter((route) => (
      (route.airline === this.state.airline || this.state.airline === 'all')
      && (route.dest === this.state.airport || route.src === this.state.airport
          || this.state.airport === 'all')
    ));

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Flying - Airline Routes</h1>
        </header>
        <section>
          <Map routes={selectedRoutes} airportClick={this.airportClick} />
          <p>
            Showing routes on 
            <Filter 
              options={filterAirlines}
              title='id'
              selected={this.state.airline}
              onSelect={this.selectAirline}
              allLabel='All Airlines'
            />
            at
            <Filter 
              options={filterAirports}
              title='code'
              selected={this.state.airport}
              onSelect={this.selectAirport}
              allLabel='All Airports'
            />
            <button onClick={this.resetFilters}>
              Reset
            </button>
          </p>
          <Table 
            columns={columns} 
            rows={selectedRoutes}
            format={this.formatValue}
            page={this.state.page}
            perPage={25}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
          />
        </section>
      </div>
    );
  }
}

export default App;
