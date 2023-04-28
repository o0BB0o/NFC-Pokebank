import React, { useState, useEffect} from 'react';
import { readNFCPokemon, swapNFCPokemon } from './api';
import PokemonCard from './PokemonCard';
import BankGrid from './BankGrid';
import NFCCard from './NFCCard';
import { Button, Divider, Space } from 'antd';
import { Col, Row } from 'antd';
import { getData, saveData } from './api';


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [nfcPokemon, setNfcPokemon] = useState(null);
  const [pokemonBank, setPokemonBank] = useState([]);

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleNFCUpdate = (pokemon) => {
    // console.log("updating card "+ pokemon);
    setNfcPokemon(pokemon);
  }

  const handleSwapPokemon = () => {
    let tmp = selectedPokemon
    let tmp2 = nfcPokemon
    
    // replace selected with nfc
    // update bank
    let newBank = []
    for (let p of pokemonBank) {
      if (p == selectedPokemon) {
        newBank.push(nfcPokemon)
      }
      else {
        newBank.push(p)
      }
    }
    setPokemonBank(newBank)
    console.log("newBank: " + newBank);
    saveData(newBank)
    
    // write selected to nfc
    swapNFCPokemon(selectedPokemon);
    //if successful, update frontend display
    
    setSelectedPokemon(tmp2)
    setNfcPokemon(tmp)
    console.log("swapped: " + selectedPokemon+ ", "+ nfcPokemon);

    
  }

  useEffect(() => {
        const fetchData = async () => {
          console.log("read nfc pokemon");
          await readNFCPokemon().then((pokemon) => {
            setNfcPokemon(pokemon)
            console.log("NFC pokemon fetched: " + pokemon);
          });
          await getData().then((pokemonBank) => {
            setPokemonBank(pokemonBank)
          });
        };
        fetchData();
    }, []);

  return (
    <div>
      <Row justify="space-evenly" align="middle" gutter={350}>
        <Col >
          <PokemonCard pokemon={selectedPokemon} />
        </Col>
        <Col >
          {selectedPokemon && <Button type="primary" onClick={handleSwapPokemon}>{"<- Swap ->"}</Button>}
        </Col>
        <Col >
          {/* <PokemonCard pokemon={selectedPokemon} /> */}
          <NFCCard nfcPokemon={nfcPokemon}/>
        </Col>
      </Row>
      <Divider orientation="left">Box 01</Divider> 
      <BankGrid onPokemonSelect={handlePokemonSelect} pokemonBank={pokemonBank} />
    </div>
  );
}

export default App;
