import React from "react";
import './scss/app.scss'
import Header from "./components/Header";
import {Outlet} from "react-router-dom";
import {store} from "./redux/store";
import {Provider} from "react-redux";

function App() {

    return (
        <div className="wrapper">
            <Provider store={store}>
                <Header/>
                <div className="content">
                    <Outlet />
                </div>
            </Provider>
        </div>
    );
}

export default App;
