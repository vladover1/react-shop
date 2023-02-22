import React, {createContext} from "react";
import './scss/app.scss'
import Header from "./components/Header";
import {Outlet} from "react-router-dom";
import {store} from "./redux/store";
import {Provider} from "react-redux";

export const SearchContext = createContext('')

function App() {

    const [searchValue, setSearchValue] = React.useState('')

    return (
        <div className="wrapper">
            <Provider store={store}>
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header/>
                <div className="content">
                    <Outlet context={searchValue}/>
                </div>
            </SearchContext.Provider>
            </Provider>
        </div>
    );
}

export default App;
