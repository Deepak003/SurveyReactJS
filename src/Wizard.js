import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from './firebase';
import { Link, withRouter } from 'react-router-dom';
import generateId from './utils';
import MultiStep from './MultiStep';
import { steps } from './multi-step/index';
import './assets/css/normalize.css';
import './assets/css/skeleton.css';
import './assets/css/custom.css';
import './assets/css/prog-tracker.css';

class Wizard extends Component {
    componentWillMount() {
        this.props.dispatch({ type: 'NO_ERROR_RECEIVED' });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.history.push('/home');
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const email = this.getEmail.value;
        const password = this.getPassword.value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log('Signed In')
                this.props.dispatch({ type: 'NO_ERROR_RECEIVED' })
                this.props.history.push('/home');
            })
            .catch((error) => {
                this.props.dispatch({ type: 'ERROR_RECEIVED', message: error.message })

            })
    }
    
    render() {
        return (
            <div className="container">
				<div>
				  <MultiStep steps={steps}/>
				</div>
				<div className="container app-footer">
				  <h6>Press 'Enter' or click on progress bar for next step.</h6>
				   Code is on <a href="https://github.com/Srdjan/react-multistep" target="_blank">github</a>
				</div>
			</div>
        );
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors
})
export default withRouter(connect(mapStateToProps)(Wizard));