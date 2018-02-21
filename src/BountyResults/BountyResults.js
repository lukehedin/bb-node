import React, { Component } from 'react';
import $ from 'jquery';
// import logo from './logo.svg';
// import './Results.css';

class BountyResults extends Component {
  componentDidMount() {
    console.log('mounted');
    debugger;

    $.post("/api/comments", function(result) {
      $( ".result" ).html(result);
    });

    // var xhr = new XMLHttpRequest();
    // var url = "/api/comments";
    // xhr.open("POST", url, true);
    // xhr.setRequestHeader("Content-type", "application/json");
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         debugger;
    //         var json = JSON.parse(xhr.responseText);
    //         console.log(json.email + ", " + json.password);
    //     }
    // };
    // var data = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
    // xhr.send();
	}
  render() {
    return (
      <div className="Bounty-Results">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to Rsssekhhjppp</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default BountyResults;
