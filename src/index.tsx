import React from 'react';
import ReactDOM from 'react-dom/client';
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import {createBrowserRouter, RouterProvider,} from "react-router-dom"
import FullPizza from "./pages/fullPizza";
import App from "./App"

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
            {
                path: '/pizza/:id',
                element: <FullPizza />,
            }
        ],
    },
])


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);



