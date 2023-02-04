import  PokemonList  from "./components/PokemonList";
import SearchBox from "./components/SearchBox";
import { PokemonProvider } from "./store";


const App = () => {

  return (
   <PokemonProvider>
    <div className="mx-auto max-w-3xl p-4">
      <SearchBox />
      <PokemonList />
    </div>
   </PokemonProvider>
  )
}

export default App;
