/* eslint-disable @next/next/no-img-element */
import PokemonList from "./(PokemonList)/PokemonList";
import Navbar from "./component/Navbar";
async function getPokemonList() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0",
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data.results;
}

export default async function Home() {
  const pokemonList = await getPokemonList();

  return (
    <div className="bg-gradient-to-tr  to-blue-600 bg-yellow-200 p-4">
      <img
        src="pokeball.png"
        alt="pokeball"
        className="fixed left-3/12 bottom-1/6 h-1/6 "
      />
      <img
        src="pokeball.png"
        alt="pokeball"
        className="fixed right-0 mx-auto h-1/6 hidden md:block"
      />
      <Navbar />
      <PokemonList pokemonList={pokemonList} />
    </div>
  );
}
