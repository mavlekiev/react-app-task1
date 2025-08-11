import { useGetPokemonByNameQuery } from '../../store/pokemonApiSlice';
import './PokemonDetail.scss';

const PokemonDetail = ({ name }: { name: string }) => {
  const { data: pokemon, isLoading, isError } = useGetPokemonByNameQuery(name);

  if (isLoading) return <p className="text">Loading details...</p>;
  if (isError) return <p className="text">Pokémon not found</p>;
  if (!pokemon) return <p className="text">No data</p>;

  return (
    <div className="pokemon-detail">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Weight: {pokemon.weight / 10} kg</p>
      <p>Experience: {pokemon.base_experience} XP</p>
      <p>Types: {pokemon.types.map((t) => t.type.name).join(', ')}</p>
      <p>
        Abilities: {pokemon.abilities.map((a) => a.ability.name).join(', ')}
      </p>
    </div>
  );
};

export default PokemonDetail;
