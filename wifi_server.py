import socket
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import json

HOST = "192.168.50.233" # IP address of your Raspberry PI
PORT = 65432          # Port to listen on (non-privileged ports are > 1023)

with open('pokemons.json', 'r') as openfile:
    pokemons = json.load(openfile)

def translatePokemon(inputPokemon):
    inputPokemon = inputPokemon.split(',')
    output = {
        "pokemon_id":inputPokemon[0],
        "pokemon_name":pokemons[str(inputPokemon[0]).zfill(4)],
        "nickname":inputPokemon[1],
        "lv":inputPokemon[2],
        "sex":"male" if inputPokemon[3] == "m" else "female" if inputPokemon[3] == "f" else "unknown",
        "nature":inputPokemon[4]
    }
    return output


def getData():
    reader = SimpleMFRC522()
    cardPokemon = None
    try:
        while(not cardPokemon):
            id, cardPokemon = reader.read()
            print(id)
            cardPokemon = translatePokemon(cardPokemon)
            cardPokemon = json.dumps(cardPokemon)
            print(cardPokemon)
    finally:
        GPIO.cleanup()
        return cardPokemon.encode()

def writePokemon(pokemon):
    reader = SimpleMFRC522()
    print("Trying to write data...")
    try:
        reader.write(pokemon)
    finally:
        print("Jobs Done!")
        GPIO.cleanup()


with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    try:
        while 1:
            client, clientInfo = s.accept()
            print("server recv from: ", clientInfo)
            recv_data = client.recv(1024)
            print(recv_data)
            if(recv_data == b'0'): # if 0, means the backend wants the current Pokemon in Card
                data = getData()
                client.sendall(data)
                print(data)
            elif(recv_data == b'1'): # Want to write
                client.sendall(b'11') # Reply: I'm ready. Send me the pokemon
                while recv_data == b'1': # If the recv_data changed from 1 to some other stuff(Pokemon)
                    client, clientInfo = s.accept()
                    recv_data = client.recv(1024)
                writePokemon(json.dump(recv_data))
                client.sendall(b'111') 
    except Exception as e:
        print("Error: ", e)
        print("Closing socket")
        client.close()
        s.close()
