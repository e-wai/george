import ShoppingBagIcon from '../assets/shopping_bag_icon.svg';
import './SignupModalComponent.css';

const Intro = () => {
    return (
            <div id='signup-modal'>
                <div className='mainBackground'>
                    <div className='row'>
                        <div className='col' id='info-col-intro'>
                            <div className='introText'>
                                <p className='title-text'>G.e.o.r.g.e</p>
                                <p className='description-text'>Find the best grocery prices in one consolidated platform and make an order with the click of a button! G.e.o.r.g.e will automatically price match your grocery list and generate the cheapest one for you!</p>
                            </div>
                            <a href="https://e-wai.github.io/george/#/register" id='redirect-button'>Register</a>
                            <a href="https://e-wai.github.io/george/#/login" id='redirect-button'>Login</a>
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