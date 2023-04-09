import './PokemonCard.css';
import {Card} from 'antd';
import { useEffect, useState } from 'react';

// let pokemon_id = 777;
// let nickname = "Picachu's Bro";
// let pokemon_name = "Togedemaru";
// let lv = 50;
// let sex = "Male";
// let nature = "Jolly";
// let item = "";

// function updateCard(new_pokemon) {
//     pokemon_id = new_pokemon?.pokemon_id;
//     nickname = new_pokemon?.nickname;
//     pokemon_name = new_pokemon?.pokemon_name;
//     lv = new_pokemon?.lv;
//     sex = new_pokemon?.sex;
//     nature = new_pokemon?.nature;
//     item = new_pokemon?.item
// }
let pokemonImages = require('./pokemon_images.json');
function getPokemonSpriteUrl(id) {
    if (!id) {
        return ""
    }
    id = id - 1;
    return pokemonImages[id]["Image URL"];
}

const PokemonCard = ({pokemon}) => {
    console.log("pokemon:", pokemon);
    // const [pokemon, setPokemon] = useState(pokemon);

    return (
        <Card
            hoverable
            style={{
                width: 300,
                height: 480
            }}
            cover={<img alt="selected" src={getPokemonSpriteUrl(pokemon?.pokemon_id)}/>}
        >
            <div id="pokemon_info">
                <h3 id="nickname">{pokemon?.nickname}</h3>
                <p id="pokemon_name">{pokemon?.pokemon_name}</p>
                <p id="lv"> Lv: {pokemon?.lv}</p>
                <p id="nature"> Nature: {pokemon?.nature}</p>
            </div>
        </Card>
    )
}

export default PokemonCard;
