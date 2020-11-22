import ShoppingBagIcon from '../assets/shopping_bag_icon.svg';
import './SignupModalComponent.css';

const Intro = () => {
    return (
            <div id='signup-modal'>
                <div className='mainBackground'>
                    <div className='row'>
                        <div className='col' id='info-col-intro'>
                            <div className='introText'>
                                <p className='title-text'>Product Name</p>
                                <p className='description-text'>Find the best prices in one consolidated platform!</p>
                            </div>
                            <a href="http://localhost:3000/register" id='redirect-button'>Register</a>
                            <a href="http://localhost:3000/login" id='redirect-button'>Login</a>
                        </div>
                        <div className='col' id='signup-col-intro'>
                            <div className='sign-up-content'>
                            <img id='icon' alt='shopping-bag-icon' src={ShoppingBagIcon}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Intro;