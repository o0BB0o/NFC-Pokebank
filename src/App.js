import React, { useState } from 'react';
import PokemonCard from './PokemonCard';
import BankGrid from './BankGrid';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };
//   function handlePokemonSelect(pokemon) {
//     console.log("selected: " + pokemon);
//     setSelectedPokemon(pokemon);
//   }

  return (
    <div>
    {console.log("passing ",selectedPokemon)}
      <PokemonCard pokemon={selectedPokemon} />
      <BankGrid onPokemonSelect={handlePokemonSelect} />
    </div>
  );
}

export default App;
