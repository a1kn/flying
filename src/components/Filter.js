import React, { Component } from 'react'

class Filter extends Component {
  handleSelect = (e) => {
    e.preventDefault();
    this.props.onSelect(e.target.value)
  }

  render() {
    const options = this.props.options.map((option) => {
      const value = option[this.props.value]
      return (
        <option key={value} value={value}>
          { option.name }
        </option>
      )
    })

    options.unshift(<option key="all" value="all">{this.props.default}</option>)

    return (
      <select key={this.props.value} onChange={this.handleSelect}>
        {options}
      </select>
    )
  }
}

export default Filter
