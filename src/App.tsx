import  PokemonList  from "./components/PokemonList";
import SearchBox from "./components/SearchBox";
import { PokemonProvider } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  ReactLocation,
  Router,
  useMatch
} from "@tanstack/react-location"
import PokemonDetail from "./components/PokemonDetail";

const queryClient = new QueryClient();
const location = new ReactLocation();

//define your routes
const routes = [
  {
    path: "/",
    element: (
      <>
      <SearchBox />
      <PokemonList />
      </>
    )
  },
  {
    path: "/pokemon/:id",
    element: <PokemonDetail />
  },
]

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
     <PokemonProvider>
    <Router location={location} routes={routes}>
    <div className="mx-auto max-w-3xl p-4">
      <Outlet />
    </div>
    </Router>
     </PokemonProvider>
    </QueryClientProvider>
  )
}

export default App;
