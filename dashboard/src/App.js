import React from "react";
import AddPurchase from"./AddPurchase.js";
import Dashboard from "./Dashboard.js";

import {Route, Link} from "react-router-dom";

function App() {
    return (
        <div className = "App">
            <Route exact path = "/" component={Dashboard}/>

            <Route exact path = "/purchase" component={AddPurchase}/>
        </div>
    )
}

export default App;