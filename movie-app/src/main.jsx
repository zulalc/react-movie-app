import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import theme from "../../theme.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //array of routes
      {
        path: "/",
        element: <div>Home</div>,
      },
      {
        path: "/movies",
        element: <div>Movies</div>,
      },
      {
        path: "/shows",
        element: <div>TV Shows</div>,
      },
      {
        path: "/search",
        element: <div>Search</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
