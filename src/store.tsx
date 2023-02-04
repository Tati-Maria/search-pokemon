import { useQuery } from "@tanstack/react-query";

import { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback, 
  useMemo } from "react";

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

//create a custom hook to fetch the pokemon data
function usePokemonSource(): {
  pokemon: Pokemon[];
  search: string;
  setSearch: (search: string) => void
} {
  const {data: pokemon} = useQuery<Pokemon[]>(["pokemon"], () => fetch("/pokemon.json").then((res) => res.json()), {
    initialData: [],
  })
  type PokemonState = {
    search: string
  };

  const initialState: PokemonState = {
    search: ""
  };

  type PokemonAction = {type: "setSearch"; payload: string};

  const [{search}, dispatch] = useReducer((state: PokemonState, action: PokemonAction) => {
    switch(action.type) {
      case "setSearch" :
        return {...state, search: action.payload};
    }
  }, initialState);

 

  const setSearch = useCallback((search: string) => {
    dispatch({
      type: "setSearch",
      payload: search
    })
  }, []);

  //calculate the search term / make it case insensitive
  const filteredPokemon = useMemo(() => pokemon.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())).slice(0, 20), [pokemon, search]);

  //sort the pokemon array
  const sortedPokemon = useMemo(() => [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name)) , [filteredPokemon])

  return {pokemon: sortedPokemon, search, setSearch};
};

//create a pokemon context 
const PokemonContext = createContext<
ReturnType<typeof usePokemonSource> | undefined>(undefined);

//a custom hook for useContext
export function usePokemon() {
  return useContext(PokemonContext)!;
}

//create a custom component for PokemonContext.Provider
export function PokemonProvider({children}: {children: React.ReactNode}) {
    return (
        <PokemonContext.Provider value={usePokemonSource()}>
            {children}
        </PokemonContext.Provider>
    )
}