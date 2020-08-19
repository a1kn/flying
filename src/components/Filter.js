import React from 'react'

const Filter = ({ options, title, allLabel, selected, onSelect }) => {
  const handleSelect = (e) => onSelect(e.target.value)

  const formattedOptions = options.map((option) => {
    const value = option[title]
    const isDisabled = option.disabled ? true : false; 
    const count = () => {
      if (option.count) {
        return `(${option.count})`
      } else {
        return ''
      }
    }

    return (
      <option key={value} disabled={isDisabled} value={value}>
        { `${option.name} ${count()}` }
      </option>
    )
  })

  formattedOptions.unshift(<option key="all" value="all">{allLabel}</option>)

  return (
    <select value={selected} onChange={handleSelect}>
      {formattedOptions}
    </select>
  )
}

export default Filter
