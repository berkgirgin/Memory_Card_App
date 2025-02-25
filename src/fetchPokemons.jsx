import { useState, useEffect } from "react";

const easyLevelPokemonNames = [
  "pikachu",
  "bulbasaur",
  "charmander",
  "squirtle",
  "meowth",
];
const mediumLevelPokemonNames = [
  "mew",
  "magmar",
  "venusaur",
  "blastoise",
  "charizard",
  "dragonite",
  "raichu",
  "gastly",
];
const hardLevelPokemonNames = [
  "articuno",
  "zapdos",
  "moltres",
  "jigglypuff",
  "snorlax",
  "weezing",
  "gyarados",
  "poliwrath",
  "onix",
  "tentacruel",
  "mewtwo",
  "machamp",
  "alakazam",
];

const allPokemonNamesArray = [
  easyLevelPokemonNames,
  mediumLevelPokemonNames,
  hardLevelPokemonNames,
];

async function fetchPokemons() {
  const allPokemonsArray = [];

  for (let i = 0; i < allPokemonNamesArray.length; i++) {
    const pokemonNamesArray = allPokemonNamesArray[i];
    const subPokemonArray = []; // one each for easy, medium and hard

    allPokemonsArray.push(subPokemonArray);

    for (let pokemonName of pokemonNamesArray) {
      try {
        let response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const pokemonEntry = {
          id: data.id,
          name: data.name,
          //   sound: data.cries.latest,
          imageUrl: data.sprites.front_default,
          isPlayed: false,
        };

        subPokemonArray.push(pokemonEntry);
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  return allPokemonsArray;
}

export default fetchPokemons;
