import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById("render-target"));

//Enables the app to be fully functional offline
registerServiceWorker();