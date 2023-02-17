import {Fragment} from "react";
import GamesSummary from "./GamesSummary";
import AvailableGames from "./AvailableGames";

const Games = () => {
    return <Fragment>
        <GamesSummary/>
        <AvailableGames/>
    </Fragment>
}

export default Games;