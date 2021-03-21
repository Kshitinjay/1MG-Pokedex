import React, { useState, useEffect } from "react";
import { getAllPokemon, getPokemon } from "./services/pokemon";
import Newpage from "./components/Newpage/";
import Pagination from "./components/Pagination/";
import "./App.css";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(0);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon?&limit=200";
  const [showPerPage, setShowPerPage] = useState(10);
  const [page, setPage] = useState({
    start: 0,
    end: showPerPage,
  });

  const handlePage = (start, end) => {
    setPage({ start: start, end: end });
    console.log(`start:${start} end:${end}`);
  };

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const loadingPokemon = async (data) => {
    let pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(pokemonData);
  };
  // console.log(pokemonData);

  const handleClick = (id) => {
    console.log(id);
    setShow(id);
  };
  return (
    <div className="App">
      <h1>Pokedex App</h1>
      <div className="main-container">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="leftPane">
              <ul>
                {pokemonData.slice(page.start, page.end).map((elem, i) => {
                  return (
                    <li className="list-item" key={i} id={elem.id} onClick={() => handleClick(elem.id)}>
                      {elem.name}
                    </li>
                  );
                })}
              </ul>
              <Pagination showPerPage={showPerPage} handlePage={handlePage} />
            </div>
            <div className="rightPane">
              <Newpage
                toShow={pokemonData[show].id}
                name={pokemonData[show].name}
                height={pokemonData[show].height}
                weight={pokemonData[show].weight}
                ability={pokemonData[show].abilities[0].ability.name}
                im={pokemonData[show].sprites.front_default}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
