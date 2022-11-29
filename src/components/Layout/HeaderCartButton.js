import {useContext, useEffect, useState} from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    //managed by the closest provider(CartProvider used in the Cart component)
    //use this to output the num of cart items
    const cartCtx = useContext(CartContext);
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const {items} = cartCtx;

    //curr is the result returned
    const numOfCartItems = items.reduce((curr, i) => {
        return curr + i.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted && classes.bump}`;

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon/></span>
        <span>Your Card</span>
        <span className={classes.badge}>{numOfCartItems}</span>
    </button>
}

export default HeaderCartButton;