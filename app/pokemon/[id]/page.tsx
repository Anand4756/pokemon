/* eslint-disable @next/next/no-img-element */
import Navbar from "@/app/component/Navbar";
import Image from "next/image";
import { Suspense } from "react";

async function getPokemon(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) return null;
  return res.json();
}

async function getPokemonSpecies(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  if (!res.ok) return null;
  return res.json();
}

async function getEvolutionChain(url: string) {
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

function getPokemonId(url: string) {
  return url.split("/").filter(Boolean).pop();
}

async function getEvolutionImages(evolutionChain: any) {
  let evolutionStages = [];
  let current = evolutionChain.chain;

  while (current) {
    const pokemonId = getPokemonId(current.species.url) || "";
    const pokemonData = await getPokemon(pokemonId);
    evolutionStages.push({
      name: current.species.name,
      image: pokemonData?.sprites.other["official-artwork"].front_default || "",
    });
    current = current.evolves_to[0];
  }

  return evolutionStages;
}

export default async function PokemonDetail({ params }: any) {
  return (
    <Suspense
      fallback={
        <div className="h-3/6 flex justify-center items-center min-h-screen">
          <img src="/dance2.gif" alt="Loading..." />
        </div>
      }
    >
      <PokemonDetailContent params={params} />
    </Suspense>
  );
}

async function PokemonDetailContent({ params }: { params: { id: string } }) {
  const { id } = await params;
  const pokemon = await getPokemon(id);
  const species = await getPokemonSpecies(id);

  if (!pokemon || !species) {
    return (
      <p className="text-center mt-10 text-red-500 text-xl">
        No Pokémon found!
      </p>
    );
  }

  const description =
    species?.flavor_text_entries.find(
      (entry: any) => entry.language.name === "en"
    )?.flavor_text || "No description available.";

  const evolutionData = await getEvolutionChain(species.evolution_chain.url);
  const evolutionStages = await getEvolutionImages(evolutionData);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr  to-blue-600 bg-yellow-200 text-white">
      <Navbar />
      <img
        src="../pokeball.png"
        alt="pokeball"
        className="fixed left-3/12  bottom-1/6 h-2/12  md:h-1/6"
      />
      <div className="my-7 detail-card-glass max-w-5xl mx-auto  rounded-xl shadow-lg p-6 text-gray-900">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              width={300}
              height={300}
              className="drop-shadow-lg transition-transform transform hover:scale-110"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-bold text-center capitalize">
              {pokemon.name}
            </h1>

            <p className="text-gray-700 text-lg  italic text-center px-4">
              {description}
            </p>

            <div className="m-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:text-lg text-sm w-5/6 md:w-full text-center">
              <p className="bg-gray-100 p-2 rounded-md">
                <strong>Height:</strong> {pokemon.height / 10} m
              </p>
              <p className="bg-gray-100 p-2 rounded-md">
                <strong>Weight:</strong> {pokemon.weight / 10} kg
              </p>
            </div>

            <div className="my-6 text-center">
              <h2 className="text-xl font-semibold">Type</h2>
              <div className="flex justify-center gap-3 mt-2">
                {pokemon.types.map((t: any) => (
                  <span
                    key={t.type.name}
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-lg capitalize shadow-md"
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-semibold">Abilities</h2>
              <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-2">
                {pokemon.abilities.map((a: any) => (
                  <span
                    key={a.ability.name}
                    className="bg-green-500 text-white px-3 py-1 rounded-full text-lg capitalize shadow-md"
                  >
                    {a.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="my-6">
          <h2 className="text-xl font-semibold text-center my-3">Base Stats</h2>
          <div className="mt-3 grid grid-cols-1  sm:grid-cols-2 gap-4">
            {pokemon.stats.map((s: any) => (
              <div key={s.stat.name} className="flex items-center">
                <span className="w-32 text-right font-semibold capitalize">
                  {s.stat.name}
                </span>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden ml-3">
                  <div
                    className="h-full bg-red-500"
                    style={{ width: `${(s.base_stat / 150) * 100}%` }}
                  ></div>
                </div>
                <span className="ml-3 font-semibold">{s.base_stat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center">Moves</h2>
          <div className="mt-3 flex flex-wrap gap-2 justify-center overflow-y-auto">
            {pokemon.moves.slice(0, 20).map((m: any) => (
              <span
                key={m.move.name}
                className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm capitalize shadow-md"
              >
                {m.move.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center">Evolution</h2>
          <div className="flex flex-col md:flex-row justify-center mt-4 gap-4 md:gap-12">
            {evolutionStages.map((evo, index) => (
              <div key={index} className="text-center">
                <Image
                  src={evo.image}
                  alt={evo.name}
                  width={120}
                  height={120}
                  className="mx-auto drop-shadow-md"
                />
                <p className="capitalize mt-2 font-semibold">{evo.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
