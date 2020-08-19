import React, { Component } from 'react'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
    };
  }

  handlePreviousClick = (e) => {
    e.preventDefault()  
    this.setState({page: this.state.page - 1})
  }

  handleNextClick = (e) => {
    e.preventDefault() 
    this.setState({page: this.state.page + 1})
  }

  render() {
    const header = this.props.columns.map((col) => {
      return (
        <th>{col.name}</th>
      );
    });

    const routeIdx = this.state.page * this.props.perPage

    const displayRows = this.props.rows.slice(
      routeIdx, (routeIdx + this.props.perPage)
    ).map((row) => {
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

    const pagination = (
      <div className='pagination'>
        <p>
          Showing {routeIdx}-{routeIdx + this.props.perPage} of&nbsp;
          {this.props.rows.length} routes
        </p>
        <p>
          <button 
            key='previous' 
            onClick={this.handlePreviousClick}
            disabled={routeIdx === 0}
          >
            Previous
          </button>

          <button 
            key='next'
            onClick={this.handleNextClick}
            disabled={routeIdx + this.props.perPage >= this.props.rows.length}
          >
            Next
          </button>
        </p>
      </div>
    )

    return (
      <div>
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
        {pagination}
      </div>
    );
  }
}

export default Table
