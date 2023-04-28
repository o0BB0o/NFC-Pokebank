import React from "react";
import { readNFCPokemon } from './api';
import { useEffect, useState } from 'react';
import './PokemonCard.css';
// import getPokemonSpriteUrl from './PokemonCard'
import {Button, Card, Typography} from 'antd';

const {Title} = Typography

let pokemonImages = require('./pokemon_images.json');
function getPokemonSpriteUrl(id) {
    if (!id) {
        return ""
    }
    id = id - 1;
    return pokemonImages[id]["Image URL"];
}

const NFCCard = ({nfcPokemon}) => {
    console.log("nfc pokemon: " + nfcPokemon);
    // const [NFCPokemon, setNFCPokemon] = useState(nfcPokemon);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       const pokemon = await readNFCPokemon();
    //       onNFCUpdate(pokemon)
    //       nfcPokemon = pokemon
    //     //   setNFCPokemon(pokemon)
    //       console.log("NFC pokemon fetched: " + pokemon);
    //     //   setData(data);
    //     };
    //     fetchData();
    // }, []);

    // const fetchNFCPokemon = async () => {
    //     const pokemon = await readNFCPokemon();
    //     onNFCUpdate(pokemon)
    //     // nfcPokemon = pokemon
    //     //   setNFCPokemon(pokemon)
    //     console.log("NFC pokemon fetched: " + pokemon);
    //     //   setData(data);
    // }

    return (    
        <Card
            hoverable
            style={{
                width: 300,
                height: 480
            }}
            cover={<img alt="NFC" src={getPokemonSpriteUrl(nfcPokemon?.pokemon_id)}/>}
            title="In NFC Card" 
            bordered={true}
        >
            <div id="pokemon_info">
                {/* <div className="bank-actions">
                    <button className="drop-pokemon-button" onClick={NFCPokemon ? onNFC_Readed(NFCPokemon) : null}>GetFromNFC</button>
                </div> */}
                <h3 id="nickname">{nfcPokemon?.nickname}</h3>
                <p id="pokemon_name">{nfcPokemon?.pokemon_name} {nfcPokemon?.sex === "male" ?
                    "♂" : nfcPokemon?.sex === "female" ?
                    "♀" : null}</p>
                <p id="lv"> Lv: {nfcPokemon?.lv}</p>
                <p id="nature"> Nature: {nfcPokemon?.nature}</p>
            </div>
            {/* <Button onClick={fetchNFCPokemon}>fetch NFC Pokemon</Button> */}
        </Card>
    )
}

export default NFCCard;