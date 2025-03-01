"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomeProps, Pokemon } from "../types/PokemonTypes";
import PokemonCard from "../component/PokemonCard";
import SearchBar from "../component/SearchBar";

export default function PokemonList({ pokemonList }: HomeProps) {
  const [, setSearch] = useState("");
  const [displayedPokemon, setDisplayedPokemon] = useState(pokemonList);
  const offsetRef = useRef(10);
  const [hasMore, setHasMore] = useState(true);
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchMorePokemon = async () => {
    if (isSearching) return;

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offsetRef.current}`
    );
    const data = await res.json();

    if (data.results.length === 0) {
      setHasMore(false);
      return;
    }

    setDisplayedPokemon((prev) => [...prev, ...data.results]);
    offsetRef.current += 10;
  };

  const handleSearch = async (query: string) => {
    setSearch(query);

    if (!query) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
    const data = await res.json();

    const filtered = data.results.filter((p: Pokemon) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered);
  };

  const pokemonToShow = isSearching ? searchResults : displayedPokemon;

  return (
    <div className="min-h-screen p-5">
      <SearchBar handleSearch={handleSearch} />
      <img
        src="pokeball.png"
        alt="pokeball"
        className="absolute mx-auto h-1/6 hidden md:block"
      />

      <InfiniteScroll
        dataLength={pokemonToShow.length}
        next={fetchMorePokemon}
        hasMore={hasMore && !isSearching}
        loader={
          <div className="w-full flex justify-center items-center col-span-full">
            <img src="dance1.gif" alt="Loading..." className="mx-auto h-3/6" />
          </div>
        }
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 p-12"
      >
        {pokemonToShow.map((pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();

          return (
            <Link key={id} href={`/pokemon/${id}`}>
              <PokemonCard pokemon={pokemon} id={id} />
            </Link>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
