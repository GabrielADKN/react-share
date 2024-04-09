import React, { useState } from "react";
import {v1 as uuid} from "uuid";
import axios from "axios";
import PokemonSelect from "./PokemonSelect.jsx";
import PokemonCard from "./PokemonCard.jsx";
import "./PokeDex.css";
import useAxios from "./hooks/useAxios.jsx";
import useSateHooks from "./hooks/useStateHooks.jsx";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const [pokemon, setPokemon, reset] = useSateHooks([]);
  const { fetchData, error, loading } = useAxios("https://pokeapi.co/api/v2/pokemon/");
  if (error) {
    return <h3>ERROR: {error.message}</h3>;
  }
  const addPokemon = async (name) => {
    const pokemonData = await fetchData(name);
    if (pokemonData) {
      setPokemon(pokemon => [...pokemon, pokemonData]);
    }
  };
  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} reset={reset}/>
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.sprites.front_default}
            back={cardData.sprites.back_default}
            name={cardData.name}
            stats={cardData.stats.map(stat => ({
              value: stat.base_stat,
              name: stat.stat.name
            }))}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
