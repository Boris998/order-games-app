import React, {useContext, useState} from "react";
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";


//the same names used for accessing the data should be used for passing down the data(AvailableMeals)
const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async userData => {
        setIsSubmitting(true);
        await fetch('https://order-food-app-7d880-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    //bind preconfigures a funct for future exe. and allows to preconfigure the argument
    //that the funct will receive on its execution
    const cartItems = <ul className={classes['cart-items']}>{
        cartCtx.items.map(item =>
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
        )
    }</ul>;

    const modalActions =
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>


    const cartModalContent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
        {isCheckout || modalActions}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = <div className={classes.actions}>
        <div className={classes.actions}>
            <p>Successful!!!</p>
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </div>;


    return <Modal className={classes['cart-items']} onClose={props.onClose}>
        {(isSubmitting || didSubmit) || cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {(isSubmitting || didSubmit) && didSubmitModalContent}
    </Modal>
}

export default Cart;