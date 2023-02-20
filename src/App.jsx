import React, {createContext} from "react";
import './scss/app.scss'
import Header from "./components/Header";
import {Outlet} from "react-router-dom";
export const SearchContext = createContext('')

function App() {

    const [searchValue, setSearchValue] = React.useState('')

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header/>
                <div className="content">
                    <Outlet context={searchValue}/>
                </div>
            </SearchContext.Provider>
        </div>
    );
}

export default App;
