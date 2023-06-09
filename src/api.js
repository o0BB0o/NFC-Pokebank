const API_URL = 'http://localhost:3001/api/data';

export const getData = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log(data);
  return data;
};

export const readNFCPokemon = async () => {
  const response = await fetch("http://localhost:3001/api/nfc");
  const data = await response.json();
  console.log(data);
  return data;
};

export const swapNFCPokemon = async (pokemon) => {
  console.log("sending Pokemon: "+ JSON.stringify(pokemon));
  const response = await fetch("http://localhost:3001/api/swap", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pokemon),
  });
  const message = await response.text();
  return message;
};

export const saveData = async (data) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const message = await response.text();
  return message;
};

