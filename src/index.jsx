import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import {createBrowserRouter, RouterProvider,} from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "cart",
                element: <Cart/>,
            },
            {
                path: "*",
                element: <NotFound/>,
            },
        ],
    },
])


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);



