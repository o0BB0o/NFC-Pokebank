import './PokemonCard.css';
import {Card, Typography} from 'antd';
import { useEffect, useState } from 'react';
const { Title } = Typography;

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

    return pokemon ? (
        
        <Card
            hoverable
            style={{
                width: 300,
                height: 480
            }}
            title="In Bank" 
            bordered={true}
            cover={<img alt="selected" src={getPokemonSpriteUrl(pokemon?.pokemon_id)}/>}
        >
            <div id="pokemon_info">
                <h3 id="nickname">{pokemon?.nickname}</h3>
                <p id="pokemon_name">{pokemon?.pokemon_name} {pokemon?.sex === "male" ?
                    "♂" : pokemon?.sex === "female" ?
                    "♀" : null}</p>
                <p id="lv"> Lv: {pokemon?.lv}</p>
                <p id="nature"> Nature: {pokemon?.nature}</p>
            </div>
        </Card>
    ) : (
        <Card
            hoverable
            style={{
                width: 300,
                height: 480
            }}
            title="In Bank" 
            bordered={true}
        >
            <Title level={3}>Select a Pokemon from your bank to swap!</Title>
        </Card>
    )
}

export default PokemonCard;
