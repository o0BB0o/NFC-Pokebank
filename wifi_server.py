import socket
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import json


HOST = "192.168.50.233" # IP address of your Raspberry PI
PORT = 65432          # Port to listen on (non-privileged ports are > 1023)

def getData():
    reader = SimpleMFRC522()
    data = None
    try:
            while(not data):
                    print(counter)
                    counter = counter + 1
                    id, text = reader.read()
                    print(id)
                    print(text)
    finally:
            GPIO.cleanup()
            return data

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
            if(recv_data == b'0'):
                data = getData()
                client.sendall(data)
            elif(recv_data == b'1'):
                client.sendall(b'11')
                while recv_data == b'1':
                    client, clientInfo = s.accept()
                    recv_data = client.recv(1024)
                writePokemon(json.dump(recv_data))
                client.sendall(b'111')
    except: 
        print("Closing socket")
        client.close()
        s.close()
