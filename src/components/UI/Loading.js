import React from "react";
import classes from "./Loading.module.css";
import loaderImg from '../../assets/giphy.gif';

const Loading = () => {
    return <img src={loaderImg} className={classes.loader} alt='loader'/>
}

export default Loading;