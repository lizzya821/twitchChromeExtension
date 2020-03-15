import React, { useEffect, useState } from "react";
import axios from "axios";

const Game = props => {
  //   console.log("props", props);
  const [game, setGame] = useState({});
  useEffect(() => {
    async function fetchGame() {
      let { data } = await axios.get(
        `https://api.twitch.tv/helix/games/?id=${props.game}`,
        {
          headers: { "Client-ID": "ysn49q6tkw94k4a6ddukhe52at424o" }
        }
      );
      setGame(data.data[0]);
    }
    fetchGame();
  }, []);
  //   console.log(game);
  return (
    <>
      {game.id ? (
        <>
          <div className="card bg-light mt-1 mb-1" style={{ width: "18rem" }}>
            <div className="card-body text-secondary">
              <h5 className="card-title">{game.name}</h5>
            </div>
          </div>
        </>
      ) : (
        <div>Empty</div>
      )}
    </>
  );
};

export default Game;
