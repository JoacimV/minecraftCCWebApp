import React, {useState} from "react"
import {useHistory} from "react-router-dom"

export default function Home() {
    let history = useHistory();
    const [id, setId] = useState();

    return (
        <section className="hero is-fullheight">
            <div className="hero-body has-text-centered">
                <div className="container">
                    <div className="box">
                        <h1 className={"is-size-2"}>JoobCraft's CC Plugin <i style={{"fontSize": 64}} className="icon-minecraft icon-minecraft-creeper-head"/></h1>
                        <div className={"columns"}>
                            <div className={"column is-1"}/>
                            <div className={"column is-10"}>
                                <input className="input is-large " onChange={e => setId(e.target.value)} type="text" placeholder="Type your id"/>
                                <button style={{marginTop:10}} className="button is-large is-success is-fullwidth" onClick={() => history.push({pathname: "/home/" + id})}>
                                    Start
                                </button>
                            </div>
                            <div className={"column"}/>
                        </div>
                        <p className={"is-size-8"}>To get started, make sure you have a <a href="https://tweaked.cc/">ComputerCraft</a> pc running.</p>
                        <p className={"is-size-8"}>Run: "pastebin get <a href="https://pastebin.com/k2AqPDiD" target={"_blank"} rel={"noreferrer"}>k2AqPDiD</a> JoobCraft", in the terminal</p>
                        <p className={"is-size-8"}>Run "JoobCraft YourId" to get started (Your id can be anything)</p>
                        <p className={"is-size-8"}>Type in your id in the input above and press Start!</p>
                    </div>
                </div>
            </div>
        </section>
    )

}

