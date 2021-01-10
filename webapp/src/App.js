import "./icons-minecraft-0.42.css"
import React from "react"
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import Home from "./components/Home"
import MainScreen from "./components/MainScreen";

function App() {
    return (
        <Router>
            <div className={"bg"}>
                <Switch>
                    <Route path="/home/:id">
                        <MainScreen/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
