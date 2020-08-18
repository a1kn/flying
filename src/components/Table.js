import React, { Component } from 'react'

class Table extends Component {
  render() {
    const header = this.props.columns.map((col) => {
      return (
        <th>{col.name}</th>
      );
    });

    const displayRows = this.props.rows.map((row) => {
      const cell = this.props.columns.map((col) => {
        const value = row[col.property] 
        return <td>{this.props.format(col.property, value)}</td>
      })

      return (
        <tr>
          {cell}
        </tr>
      )
    });

    return (
      <table className='routes-table'>
        <thead>
          <tr>
            {header}
          </tr>
        </thead>
        <tbody>
          {displayRows}
        </tbody>
      </table>
    );
  }
}

export default Table
