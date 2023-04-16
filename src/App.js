import React, { useState } from 'react';
import PokemonCard from './PokemonCard';
import BankGrid from './BankGrid';
import NFCCard from './NFCCard';


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [nfcPokemon, setNfcPokemon] = useState(null);

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleNFCUpdate = (pokemon) => {
    console.log("updating card "+ pokemon);
    setNfcPokemon(pokemon);
  }
//   function handlePokemonSelect(pokemon) {
//     console.log("selected: " + pokemon);
//     setSelectedPokemon(pokemon);
//   }

  return (
    <div>
    {/* {console.log("passing ",selectedPokemon)} */}
      <PokemonCard pokemon={selectedPokemon} />
      <NFCCard onNFCUpdate={handleNFCUpdate}/>
      <BankGrid onPokemonSelect={handlePokemonSelect} />
    </div>
  );
}

export default App;
