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

function savePokemonBank(pokemonBank) {
    saveData(pokemonBank)
}

const BankGrid = () => {
    const [pokemonBank, setPokemonBank] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const pokemonBank = await getData();
          setPokemonBank(pokemonBank)
        //   setData(data);
        };
        fetchData();
      }, []);

    return (
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
            }}
            dataSource={pokemonBank}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        style={{
                            width: 100,
                            height: 100
                        }}
                        cover={<img alt="selected" src={getPokemonSpriteUrl(item?.pokemon_id)}/>}>
                    </Card>
                </List.Item>
                )
            }></List>
    )
};

export default BankGrid