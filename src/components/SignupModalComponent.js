import GroceryCartIcon from '../assets/grocery_cart_icon.png';
import './SignupModalComponent.css';

const link = <a href={"https://www.youtube.com/watch?v=fvjpE_wFL5A"}>Sign up</a>;

export default function SignupModalComponent () {
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
                    <form>
                        <label> 
                            Email
                            <br/>
                            <input type="text" name="email"/>
                        </label>
                    </form>
                    <form>
                        <label>
                            Password
                            <br/>
                            <input type="text" name="password"/>
                        </label>
                    </form>
                    <button id='log-in-button'>Log in</button>
                </div>
            </div>
        </div>
    </div>;
}
