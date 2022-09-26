import "./App.css";
import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import React from "react";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
