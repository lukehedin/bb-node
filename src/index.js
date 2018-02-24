import React from "react";
import ReactDOM from "react-dom";
import Base from "./Base/Base";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Base />, 
  document.getElementById("root")
);

//Enables the app to be fully functional offline
registerServiceWorker();