import './BankGrid.css';
import {Card, List} from 'antd';

let json = require('./pokemon_images.json');

function getPokemonSpriteUrl(id) {
    id = id - 1;
    return json[id]["Image URL"];
}

const data = [
    {
        title: 'Togedemaru',
        id: 777,
    },
    {
        title: 'Mimikyu',
        id: 778,
    },
    {
        title: 'Title 3',
        id: 778,
    },
    {
        title: 'Title 4',
        id: 778,
    },
    {
        title: 'Title 5',
        id: 778,
    },
    {
        title: 'Title 6',
        id: 778,
    },
];
const App = () => (
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
        dataSource={data}
        renderItem={(item) => (
            <List.Item>
                <Card
                    style={{
                        width: 100,
                        height: 100
                    }}
                    cover={<img alt="selected" src={getPokemonSpriteUrl(item.id)}/>}>
                </Card>
            </List.Item>
        )}
    />
);
export default App;