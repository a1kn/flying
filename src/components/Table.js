import React, { Component } from 'react'

class Table extends Component {
  render() {
    const row = this.props.routes.map((route) => { return (
      <tr>
        <td>{route.airline}</td>
        <td>{route.src}</td>
        <td>{route.dest}</td>
      </tr>
    )})

    return (
      <table className='routes-table'>
        <thead>
          <tr>
            <th>Airline</th>
            <th>Source</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {row}
        </tbody>
      </table>
    );
  }
}

export default Table
