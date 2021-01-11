import React from "react";

export default function Command(props) {

    function send() {
        props.setInput(oldArray => [...oldArray, props.command])
        props.send();
    }

    return (
        <div>
            <h1 className={"is-size-3"}>Send command:</h1>
            <input className={"input is-large"} placeholder="Type a command, like: os.day()" type="text" onChange={e => props.setCommand(e.target.value)}/>
            <button style={{marginTop: 10, marginBottom: 10}} className={"button is-dark is-fullwidth is-large"} onClick={send}>Send</button>
        </div>
    )
}

