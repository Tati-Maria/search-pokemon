import  PokemonList  from "./components/PokemonList";
import SearchBox from "./components/SearchBox";
import  {usePokemon} from "./store"


const App = () => {

  return (
    <div className="mx-auto max-w-3xl p-4">
      <SearchBox />
      <PokemonList />
    </div>
  )
}

export default App;
