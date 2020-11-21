import GroceryCartIcon from '../assets/grocery_cart_icon.png';
import './SignupModalComponent.css';
import React from 'react';

const link = <a href={"https://www.youtube.com/watch?v=fvjpE_wFL5A"}>Sign up</a>;

export default class SignupModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        // TODO error checking 
        console.log(`Submitted with ${this.state.email} and ${this.state.password}`)
        event.preventDefault();
    }

    render() {
        return <div id='signup-modal'>
            <div className='row'>
                <div className='col' id='info-col'>
                    <p className='title-text'>Product Name</p>
                    <p className='info-text'>Find the best prices in one consolidated platform!</p>
                    <img id='icon' alt='grocery-cart-icon' src={GroceryCartIcon}/>
                </div>
                <div className='col' id='signup-col'>
                    <p className='info-text' id='sign-up-text'>Not a member? {link}</p>
                    <div className='sign-up-content'>
                        <form onSubmit={this.handleSubmit}>
                            <label> 
                                Email
                                <br/>
                                <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                            </label>
                            <label>
                                Password
                                <br/>
                                <input type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
                            </label>
                            <input type="submit" value="Log in" id='log-in-button'/>
                        </form>
                    </div>
                </div>
            </div>
        </div>;
    }
}
