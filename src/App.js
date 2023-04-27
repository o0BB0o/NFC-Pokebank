import React, { useState, useEffect} from 'react';
import { readNFCPokemon } from './api';
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
      {console.log("passing ",nfcPokemon)}
      <Row justify="space-evenly">
        <Col span={12}>
          <PokemonCard pokemon={selectedPokemon} />
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={handleSwapPokemon}>{"<- Swap ->"}</Button>
        </Col>
        <Col span={8}>
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
