import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';

const CartDropdown = ( ) => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className='cart-dropdown-container'>
            <div>
                {cartItems.map(item => <CartItem key={item.id} CartItem={item} />)}
            </div>
            <div className='cart-items'>
                <Button>GO TO CHECKOUT</Button>
            </div>

        </div>
    );
}

export default CartDropdown;