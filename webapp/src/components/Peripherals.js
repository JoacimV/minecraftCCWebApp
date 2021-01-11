import React from "react";

export default function Peripherals(props) {

    if (props.peripherals === undefined) {
        return null
    } else return (
        <div className={"column"}>
            <h1 className={"is-size-3"}>Connected peripherals:</h1>
            {props.peripherals.map(p => {
                return (
                    <div key={p.location}>
                        <p className={"is-size-4"}>{p.location + ": " + p.type}</p>
                        <p className={"title is-size-6 has-text-primary"}>{p.methods}</p>
                    </div>
                )
            })}
        </div>
    )
}