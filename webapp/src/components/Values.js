import React from "react";

export default function Values(props) {
    if (props.data === undefined) {
        return (
            <div className={"columns is-mobile"}>
                <div className={"column"}>
                    <h1 className={"is-size-3"}>No data received</h1>
                </div>
            </div>
        )
    }
    return (
        <div className={"column"}>
            <h1 className={"is-size-3"}>Values from {props.id}'s world:</h1>
            <p className={"is-size-4"}><i className="icon-minecraft icon-minecraft-player-head"/> ID: {props.id}</p>
            <p className={"is-size-4"}><i className="icon-minecraft icon-minecraft-clock"/> Your world time: {props.data.time}</p>
            <p className={"is-size-4"}><i className="icon-minecraft icon-minecraft-acacia-boat"/> Day's since world created: {props.data.day}</p>
            <p className={"is-size-4"}><i className="icon-minecraft icon-minecraft-dispenser"/> Computer Label: {props.data.label}</p>
        </div>
    )
}

