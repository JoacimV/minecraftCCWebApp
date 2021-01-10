import React, {useState} from "react"
import {useParams} from "react-router-dom"

// https://www.gamergeeks.nz/apps/minecraft/web-developer-tools/css-blocks-and-entities
function connect(id, setTime, setDay, setLabel) {
    const socket = new WebSocket('wss://vetterlain.dk/subscribe/' + id);
    socket.addEventListener('message', function (event) {
        let data = JSON.parse(event.data);
        setTime(data.time)
        setDay(data.day)
        setLabel(data.label)
    });
}

export default function MainScreen() {
    const [time, setTime] = useState();
    const [day, setDay] = useState();
    const [label, setLabel] = useState("");
    let id = useParams().id;
    if (time === undefined) {
        connect(id, setTime, setDay, setLabel);
    }
    return (
        <section className="hero is-fullheight">
            <div className="hero-body ">
                <div className="container">
                    <div className="box">
                        <h1 className={"is-size-3"}>Values from {id}'s world:</h1>
                        <div className={"columns is-mobile"}>
                            <div className={"column"}>
                                <p className={"is-size-4"}><i className="icon-minecraft icon-minecraft-player-head"/> ID: {id}</p>
                                <p className={"is-size-4"}><i className="icon-minecraft icon-minecraft-clock"/> Your world time: {time}</p>
                                <p className={"is-size-4"}><i className="icon-minecraft icon-minecraft-acacia-boat"/> Day's since world created: {day}</p>
                                <p className={"is-size-4"}><i className="icon-minecraft icon-minecraft-dispenser"/> Computer Label: {label}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}