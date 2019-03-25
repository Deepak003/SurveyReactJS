'use strict'
import React from 'react'

export class StepTwo extends React.Component {
  constructor () {
    super()
    this.state = {
      email: '',
      emailConfirm: ''
    }
    this.handleEmailChanged = this.handleEmailChanged.bind(this);
    this.handleEmailConfirmChanged = this.handleEmailConfirmChanged.bind(this);
  }

  handleEmailChanged (event) {
    this.setState({email: event.target.value})
  }

  handleEmailConfirmChanged (event) {
    this.setState({emailConfirm: event.target.value})
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='six columns'>
            <label>Question 1</label>
            <input
              className='u-full-width required'
              placeholder='Enter Question here'
              type='email'
              onChange={this.handleEmailChanged}
              value={this.state.email}
              autoFocus
            />
          </div>
        </div>
        <div className='row'>
          <div className='six columns'>
            <label>Question 2</label>
            <input
              className='u-full-width'
              placeholder='Enter Question here'
              type='email'
              onChange={this.handleEmailConfirmChanged}
              value={this.state.emailConfirm}
            />
          </div>
        </div>
		 
      </div>
    )
  }
}
