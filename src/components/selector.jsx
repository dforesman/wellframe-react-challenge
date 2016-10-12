// Simple <select> component, receives all props and events from parent

import React from 'react'


class Selector extends React.Component {
  render() {
    const {options, value, onChange} = this.props
    return (
      <select onChange={event => (onChange(event.target.value))} value={value}>
        {options.map(option => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          )
        })}
      </select>
    )
  }
}


Selector.propTypes = {
  value: React.PropTypes.string.isRequired,
  options: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired
  ).isRequired,
  onChange: React.PropTypes.func.isRequired
}


export default Selector