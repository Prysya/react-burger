import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
// @ts-ignore
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
