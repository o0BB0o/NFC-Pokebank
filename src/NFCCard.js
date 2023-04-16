import React from "react";
import { readNFCPokemon } from './api';
import { useEffect, useState } from 'react';
import './PokemonCard.css';
// import getPokemonSpriteUrl from './PokemonCard'
import {Card} from 'antd';

let pokemonImages = require('./pokemon_images.json');
function getPokemonSpriteUrl(id) {
    if (!id) {
        return ""
    }
    id = id - 1;
    return pokemonImages[id]["Image URL"];
}

const NFCCard = ({onNFCUpdate}) => {
    // console.log("nfc pokemon: " + nfcPokemon);
    const [NFCPokemon, setNFCPokemon] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const pokemon = await readNFCPokemon();
          onNFCUpdate(pokemon)
          setNFCPokemon(pokemon)
          console.log("NFC pokemon fetched: " + pokemon);
        //   setData(data);
        };
        fetchData();
    }, []);

    return (
        
        <Card
            hoverable
            style={{
                width: 300,
                height: 480
            }}
            cover={<img alt="selected" src={getPokemonSpriteUrl(NFCPokemon?.pokemon_id)}/>}
        >
            <div id="pokemon_info">
                {/* <div className="bank-actions">
                    <button className="drop-pokemon-button" onClick={NFCPokemon ? onNFC_Readed(NFCPokemon) : null}>GetFromNFC</button>
                </div> */}
                <h3 id="nickname">{NFCPokemon?.nickname}</h3>
                <p id="pokemon_name">{NFCPokemon?.pokemon_name} {NFCPokemon?.sex === "male" ?
                    "♂" : NFCPokemon?.sex === "female" ?
                        "♀" : null}</p>
                <p id="lv"> Lv: {NFCPokemon?.lv}</p>
                <p id="nature"> Nature: {NFCPokemon?.nature}</p>
            </div>
        </Card>
    )
}

export default NFCCard;