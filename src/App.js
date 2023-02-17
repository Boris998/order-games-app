import Header from "./components/Layout/Header";
import {useState} from "react";
import Games from "./components/Games/Games";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

const App = () => {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartIsShownHandler = () => {
        setCartIsShown(true);
    }
    const hideCartIsShownHandler = () => {
        setCartIsShown(false);
    }

    return (
        <CartProvider>
            {cartIsShown && <Cart onClose={hideCartIsShownHandler}/>}
            <Header onShowCart={showCartIsShownHandler}/>
            <main>
                <Games/>
            </main>
        </CartProvider>
    );
}

export default App;
