export async function fetchPokemonList(offset: number, limit: number) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    {
      next: { revalidate: 3600 },
    }
  );
  return res.json();
}
