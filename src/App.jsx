import React from "react";
import './scss/app.scss'
import Header from "./components/Header";
import { Outlet } from "react-router-dom";


function App() {
    const [searchValue, setSearchValue] = React.useState('')

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
              <Outlet />
            </div>
        </div>
    );
}

export default App;
