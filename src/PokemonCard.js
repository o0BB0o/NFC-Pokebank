import './PokemonCard.css';
import {Card} from 'antd';

let pokemon_id = 777;
let nickname = "Picachu's Bro";
let pokemon_name = "Togedemaru";
let lv = 50;
let sex = "Male";
let nature = "Jolly";

function updateCard(new_pokemon) {
    // nickname = new_pokemon.nickname;
}

function App() {
    return (
        <Card
            hoverable
            style={{
                width: 300,
                height: 480
            }}
            cover={<img alt="selected" src="https://archives.bulbagarden.net/media/upload/8/8b/0777Togedemaru.png"/>}
        >
            <div id="pokemon_info">
                <h3 id="nickname">{nickname}</h3>
                <p id="pokemon_name">{pokemon_name}</p>
                <p id="lv"> Lv: {lv}</p>
                <p id="nature"> Nature: {nature}</p>
            </div>
        </Card>
    );
}

export default App;
