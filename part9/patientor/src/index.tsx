import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import { reducer, StateProvider } from "./state";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  </Router>,
  document.getElementById('root')
);
