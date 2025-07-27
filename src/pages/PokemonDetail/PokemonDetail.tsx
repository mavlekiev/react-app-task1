import { useState, useEffect } from 'react';
import type {
  PokemonDetailProps,
  PokemonDetails,
} from '../../utils/interfaces';
import './PokemonDetail.scss';

const PokemonDetail = ({ name }: PokemonDetailProps) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const PokemonDetails = await response.json();
        setPokemon(PokemonDetails);
      } catch {
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchDetail();
  }, [name]);

  if (loading) return <p className="text">Loading details...</p>;
  if (!pokemon) return <p className="text">Pokémon not found</p>;

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
