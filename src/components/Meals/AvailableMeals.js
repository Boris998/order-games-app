import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from "react";
import Loading from "../UI/Loading";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://order-food-app-7d880-default-rtdb.europe-west1.firebasedatabase.app/meals.json');

            if (!response.ok) {
                throw new Error('sth went wrong');
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const keyID in responseData) {
                loadedMeals.push({
                    id: keyID,
                    name: responseData[keyID].name,
                    description: responseData[keyID].description,
                    price: responseData[keyID].price,
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };

        try {
            fetchMeals();
        } catch (error) {
            setIsLoading(false);
            setHttpError(error.message);
        }

    }, []);

    if (isLoading) return <Loading/>

    if (httpError) return <Loading/>


    const mealsList = meals.map(meal =>
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    );

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;