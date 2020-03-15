import React, { useState } from "react";
import Game from "./games.js";
import axios from "axios";
// import logo from "./logo.svg";
import "./App.css";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log("games in general", games);
  const onClick = async () => {
    setLoading(true);
    let newGames = [];
    // console.log("getting topstreams");
    let topStreams = await axios.get("https://api.twitch.tv/helix/streams/", {
      headers: { "Client-ID": "ysn49q6tkw94k4a6ddukhe52at424o" }
    });
    for (let i = 0; i < topStreams.data.data.length; i++) {
      let curStream = topStreams.data.data[i];
      let data;
      data = await axios.get(
        `https://api.twitch.tv/helix/streams/?game_id=${curStream.game_id}`,
        {
          headers: { "Client-ID": "ysn49q6tkw94k4a6ddukhe52at424o" }
        }
      );
      // console.log(data.data.data);
      if (data.data.data.length < 10) {
        // console.log("in first if");
        newGames.push(curStream.game_id);
      } else if (
        data.data.data[2].viewer_count <=
        data.data.data[0].viewer_count / 10
      ) {
        // console.log("in second if");
        newGames.push(curStream.game_id);
      }
    }
    setGames(newGames);
    setLoading(false);
  };
  return (
    <div className="App">
      <nav
        className="navbar navbar-dark text-light navbar-brand mx-auto mb-3 mt-2"
        style={{
          backgroundColor: "#737373",
          borderRadius: 10
        }}
      >
        Twitch Game Suggestion
      </nav>
      {games.length && !loading ? (
        games.map((curGame, index) => {
          return <Game game={curGame} key={index} />;
        })
      ) : loading ? (
        <div>Loading</div>
      ) : (
        <div className="game">
          <label>
            Click here to get a suggestion for what game you should play!
          </label>
          <button
            type="button"
            className="btn btn-outline-dark btn-light"
            onClick={onClick}
          >
            Click!
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
