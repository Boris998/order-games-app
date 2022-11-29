import classes from './Checkout.module.css';
import useInput from "../../hooks/use-input";
import {useEffect, useState} from "react";

const Checkout = (props) => {
    const {
        value: enteredName,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueInputBlurHandler: nameInputBlurHandler,
        valueInputChangeHandler: nameInputChangeHandler,
        reset: resetNameInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredStreet,
        isValid: streetIsValid,
        hasError: streetHasError,
        valueInputBlurHandler: streetInputBlurHandler,
        valueInputChangeHandler: streetInputChangeHandler,
        reset: resetStreetInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredPostalCode,
        isValid: postalIsValid,
        hasError: postalHasError,
        valueInputBlurHandler: postalInputBlurHandler,
        valueInputChangeHandler: postalInputChangeHandler,
        reset: resetPostalCodeInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredCity,
        isValid: cityIsValid,
        hasError: cityHasError,
        valueInputBlurHandler: cityInputBlurHandler,
        valueInputChangeHandler: cityInputChangeHandler,
        reset: resetCityInput
    } = useInput(value => value.trim() !== '');

    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) setFormIsValid(true);
    }, [nameIsValid, streetIsValid, postalIsValid, cityIsValid]);

    const confirmHandler = e => {
        e.preventDefault();

        if (!formIsValid) return;

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostalCode
        });

        resetNameInput();
        resetStreetInput();
        resetPostalCodeInput();
        resetCityInput();
    }

    const nameInputClasses = nameHasError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const streetInputClasses = streetHasError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const postalInputClasses = postalHasError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const cityInputClasses = cityHasError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;

    return (
        <form onSubmit={confirmHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id='name'
                    value={enteredName}
                    onBlur={nameInputBlurHandler}
                    onChange={nameInputChangeHandler}
                />
                {nameHasError && <label>Name field is required!!</label>}
            </div>
            <div className={streetInputClasses}>
                <label htmlFor="street">Street</label>
                <input
                    type="text"
                    id='street'
                    value={enteredStreet}
                    onBlur={streetInputBlurHandler}
                    onChange={streetInputChangeHandler}
                />
                {streetHasError && <label>Street field is required!!</label>}
            </div>
            <div className={postalInputClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input
                    type="text"
                    id='postal'
                    value={enteredPostalCode}
                    onBlur={postalInputBlurHandler}
                    onChange={postalInputChangeHandler}
                />
                {postalHasError && <label>Postal Code field is required!!</label>}
            </div>
            <div className={cityInputClasses}>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id='city'
                    value={enteredCity}
                    onBlur={cityInputBlurHandler}
                    onChange={cityInputChangeHandler}
                />
                {cityHasError && <label>City field is required!!</label>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
}

export default Checkout;

