import React, {useContext} from "react";
import classes from './GameItem.module.css';
import GameItemForm from "./GameItemForm";
import CartContext from "../../../store/cart-context";


//the same names used for accessing the data should be used for passing down the data(AvailableGames)
const GameItem = (props) => {

    const cardCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    const addToCardHandler = amount => {
        cardCtx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            coverImg: props.coverImg,
            amount: amount
        });
    }

    return <li className={classes.game}>
        <div className={classes.facts}>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
        </div>
        <div className={classes.cover}>
            <img src={props.coverImg} alt='cover'/>
        </div>
        <div>
            <div className={classes.price}>{price}</div>
            <GameItemForm id={props.id} onAddToCart={addToCardHandler}></GameItemForm>
        </div>
    </li>
}

export default GameItem;