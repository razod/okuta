import React from "react";
import AppNavbar from "./components/AppNavbar";
import Homework from "./components/Homework";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <Homework />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
