import React from "react";



const UI = ({onNFC_Readed}) => {
    function HandleGetFromNFC(){
        //TODO
    }

    return (
        <div className="bank-actions">
            <button className="drop-pokemon-button" onClick={HandleGetFromNFC}>GetFromNFC</button>
        </div>
    )
}

export default UI;