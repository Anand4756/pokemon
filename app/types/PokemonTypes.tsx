interface Pokemon {
  name: string;
  url: string;
}

interface HomeProps {
  pokemonList: Pokemon[];
}

export type { Pokemon, HomeProps };
