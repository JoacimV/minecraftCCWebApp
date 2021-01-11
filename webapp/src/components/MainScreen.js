import React, {useState, useRef} from "react"
import {useParams} from "react-router-dom"
import Command from "./Command";
import Values from "./Values";
import Peripherals from "./Peripherals";

// https://www.gamergeeks.nz/apps/minecraft/web-developer-tools/css-blocks-and-entities

function connect(id, setData, socket, setOutput, setInput) {
    socket.current = new WebSocket('wss://vetterlain.dk/subscribe/' + id);
    socket.current.addEventListener('open', () => {    // When connected to the websocket, let's check if there's any peripherals connected
        setInput(oldArray => [...oldArray, 'peripheral.getNames()'])
        socket.current.send('peripheral.getNames()')
    })
    socket.current.addEventListener('message', function (event) {
        // console.log(event.data);
        let data;
        let error;
        try {
            data = JSON.parse(event.data);
        } catch (e) {
            error = e;
        }
        if (error || event.data.length === 0) {
            setOutput(oldArray => [...oldArray, event.data]) // Show the error to our user
        } else {
            if (data.result !== undefined) { // response from a command
                setOutput(oldArray => [...oldArray, data.result.toString()])
            } else {
                if (data.day !== undefined) {
                    setData(data) // Data sent every .3 seconds from computer
                }
            }
        }
    });
}

function sendCommand(command, socket) {
    socket.current.send(command)
}

export default function MainScreen() {
    const socket = useRef();
    const [data, setData] = useState();
    const [input, setInput] = useState([]);
    const [output, setOutput] = useState([]);
    const [command, setCommand] = useState();
    let id = useParams().id;
    if (socket.current === undefined) {
        connect(id, setData, socket, setOutput, setInput);
    }

    // The next 40 lines are for getting the peripherals attached and their methods
    const [peripherals, setPeripherals] = useState(undefined);
    const [peripheralsReceived, setPeripheralsReceived] = useState(false);
    const [peripheralMethods, setPeripheralMethos] = useState(false);
    if (input.length === 1 && output.length === 1) {
        let arr = output[0].split(",");
        arr.forEach(peripheral => {
            setInput(oldArray => [...oldArray, 'peripheral.getType("' + peripheral + '")'])
            sendCommand('peripheral.getType("' + peripheral + '")', socket)
        })
    }
    // Set names
    if (peripherals === undefined && output[0] !== undefined && output.length === output[0].split(",").length + 1) {
        const peripherals = output[0].split(",");
        let ps = [];
        peripherals.forEach((peripheral, i) => {
            ps.push({location: peripherals[i], type: output[i + 1]});
        })
        setPeripherals(ps);
    }
    // Get methods
    if (!peripheralsReceived && peripherals) {
        peripherals.forEach(peripheral => {
            setInput(oldArray => [...oldArray, 'peripheral.getMethods("' + peripheral.location + '","' + peripheral.type + '")'])
            sendCommand('peripheral.getMethods("' + peripheral.location + '","' + peripheral.type + '")', socket)
        });
        setPeripheralsReceived(true);
    }
    // Set Methods
    if (peripheralsReceived && !peripheralMethods && input.length === output.length) {
        peripherals.reverse().forEach((peripheral, i) => {
            peripheral.methods = output[output.length - 1 - i];
        })
        setPeripheralMethos(true);
    }


    return (
        <section className="hero is-fullheight">
            <div className="hero-body ">
                <div className="container">
                    <div className="box">
                        <div className={"columns is-mobile"}>
                            <Values data={data} id={id}/>
                            <Peripherals peripherals={peripherals}/>
                        </div>
                        <Command send={() => sendCommand(command, socket, setCommand, setInput)} command={command} setCommand={setCommand} setInput={setInput}/>
                        <div className={"columns"}>
                            <div className={"column"}>
                                <RenderInput input={input}/>
                            </div>
                            <div className={"column"}>
                                <RenderOutput output={output}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function RenderInput(props) {
    return (
        <div>
            <h1 className={"is-size-6"}>Input:</h1>
            <code>
                {props.input.map((input, index) => {
                    return (<p className={"title is-6 has-text-danger"} key={index}>{input}</p>)
                })}
            </code>
        </div>
    )
}


function RenderOutput(props) {
    return (
        <div>
            <h1 className={"is-size-6"}>Output:</h1>
            <code>
                {props.output.map((output, index) => {
                    return (<p className={"title is-6 has-text-success"} key={index}>{output}</p>)
                })}
            </code>
        </div>
    )
}
