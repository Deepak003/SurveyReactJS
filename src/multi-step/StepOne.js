'use strict'
import React from 'react'

export class StepOne extends React.Component {
  constructor () {
    super()
    this.state = { 
      firstName: '', 
      lastName: ''
    }
    this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
    this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
  }

  handleFirstNameChanged (event) {
    this.setState({firstName: event.target.value})
  }

  handleLastNameChanged (event) {
    this.setState({lastName: event.target.value})
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='six columns'>
            <label>Survey Name</label>
            <input
              className='u-full-width'
              placeholder='Add Survey Name here...'
              type='text'
              onChange={this.handleFirstNameChanged}
              value={this.state.firstName}
              autoFocus
            />
          </div>
        </div>
        <div className='row'>
          <div className='six columns'>
            <label>Survey Description</label>
            <input
              className='u-full-width'
              placeholder='Add Survey Decription here...'
              type='text'
              onChange={this.handleLastNameChanged}
              value={this.state.lastName}
            />
          </div>
		</div> 
		  <div className='row'>
          <div className='six columns'>
            <label>Survey Launch Date</label>
            <input
              className='u-full-width'
              placeholder='Add Launch Date in DD/MM/YY here...'
              type='text'
              onChange={this.handleLastNameChanged}
              value={this.state.lastName}
            />
          </div>
        </div>
      </div>
    )
  }
}
