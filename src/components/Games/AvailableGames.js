import Card from "../UI/Card";
import classes from "./AvailableGames.module.css";
import GameItem from "./MealItem/GameItem";
import {useEffect, useState} from "react";
import Loading from "../UI/Loading";

const AvailableGames = () => {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch('https://ps-games-app-default-rtdb.europe-west1.firebasedatabase.app/games.json');

            if (!response.ok) {
                throw new Error('sth went wrong');
            }

            const responseData = await response.json();

            const loadedGames = [];

            for (const keyID in responseData) {
                loadedGames.push({
                    id: keyID,
                    name: responseData[keyID].name,
                    description: responseData[keyID].description,
                    price: responseData[keyID].price,
                    coverImg: responseData[keyID].coverImg,
                });
            }

            setGames(loadedGames);
            setIsLoading(false);
        };

        try {
            fetchGames();
        } catch (error) {
            setIsLoading(false);
            setHttpError(error.message);
        }

    }, []);

    if (isLoading) return <Loading/>

    if (httpError) return <Loading/>


    const gamesList = games.map(game =>
        <GameItem
            key={game.id}
            id={game.id}
            name={game.name}
            description={game.description}
            price={game.price}
            coverImg={game.coverImg}
        />
    );

    return (
        <section className={classes.games}>
            <Card>
                <ul>
                    {gamesList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableGames;