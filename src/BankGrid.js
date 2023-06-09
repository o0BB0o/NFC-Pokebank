import './BankGrid.css';
import {Card, List} from 'antd';
import { getData, saveData } from './api';
import { useEffect, useState } from 'react';

let pokemonImages = require('./pokemon_images.json');
// let pokemonBank

function getPokemonSpriteUrl(id) {
    id = id - 1;
    return pokemonImages[id]["Image URL"];
}

// async function fetchBankData() {
//     pokemonBank = await getData();
//     // fs.writeFile('./mybank.json', JSON.stringify(data), (err) => {
//     //     if (err) console.log('Error writing file:', err);
//     // })
//     // await writeJsonFile('./mybank2.json', data);
//     console.log(pokemonBank);
// }

// function savePokemonBank(pokemonBank) {
//     saveData(pokemonBank)
// }

const BankGrid = ({onPokemonSelect, pokemonBank}) => {
    console.log("pokemonBank:", pokemonBank);
    // const [pokemonBank, setPokemonBank] = useState([]);

    
    // useEffect(() => {
    //   const fetchData = async () => {
    //     const pokemonBank = await getData();
    //     setPokemonBank(pokemonBank)
    //   //   setData(data);
    //   };
    //   fetchData();
    // }, []);


    return (
        <List
            grid={{
                gutter: 32,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 5,
                xxl: 5,
            }}
            dataSource={pokemonBank}
            renderItem={(item) => (
                <List.Item>
                    <div onClick={() => {
                        onPokemonSelect(item)
                    }}><Card hoverable
                        style={{
                            width: 150,
                            height: 150,
                        }}
                        cover={<img alt="selected" src={getPokemonSpriteUrl(item?.pokemon_id)}/>}>
                    </Card></div>
                </List.Item>
                )
            }></List>
    )
};

export default BankGrid