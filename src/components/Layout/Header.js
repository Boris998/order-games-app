import React from "react";
import mealsImg from '../../assets/hero-image.jpg';
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return <React.Fragment>
        <header className={classes.header}>
            <h1>PS4/PS5 Game Store</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImg} alt='delicios'/>
        </div>
    </React.Fragment>
}

export default Header;