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
            <label>Question Template Name</label>
            <input
              className='u-full-width required'
              placeholder='Enter Question Template Name here'
              type='text'
              onChange={this.handleEmailChanged}
              value={this.state.email}
              autoFocus
            />
          </div>
        </div>
	<div className='row'>
          <div className='six columns'>
            <a href="https://survey-create-questions.netlify.com/">Create Questions</a>
          </div>
        </div>
	
      </div>
    )
  }
}
