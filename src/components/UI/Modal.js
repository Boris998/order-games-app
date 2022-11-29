import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import classes from './Modal.module.css';

// all key val pairs in the input obj, which we receive on props.input are added to input
// {...props.input} ~= --> {type: 'text'}

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}/>
}

const ModalOverlay = (props) => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
}

export default Modal;