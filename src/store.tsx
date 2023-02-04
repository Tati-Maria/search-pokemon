import {create} from "zustand"
//Zustand is a direct state manager for react => https://zustand-demo.pmnd.rs/
//the data flow only goes one way/one direction

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

const searchAndSortPokemon = (
  pokemon: Pokemon[],
  search: string
) => pokemon
.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
.slice(0, 10)
.sort((a, b) => a.name.localeCompare(b.name));

export const usePokemon = create<{
  pokemon: Pokemon[];
  allPokemon: Pokemon[];
  setAllPokemon: (pokemon: Pokemon[]) => void;
  search: string;
  setSearch: (search: string) => void
}>((set, get) => ({
  pokemon: [],
  allPokemon: [],
  setAllPokemon: (pokemon) => 
  set({allPokemon: pokemon, pokemon: searchAndSortPokemon(pokemon, get().search)
  }),
  search: "",
  setSearch: (search) => set({search,
    pokemon: searchAndSortPokemon(get().allPokemon, search)
  }),
}));

//fetch the data
fetch("/pokemon.json")
.then((res) => res.json())
.then((pokemon) => usePokemon.getState().setAllPokemon(pokemon));