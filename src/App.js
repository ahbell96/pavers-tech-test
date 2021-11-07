import React, { Component } from "react";
import "./App.scss";
import ContactForm from "./components/contactForm";

export default class App extends Component {
  state = {};
  componentDidMount() {}

  handleOnSubmit = (event) => {
    // axios post data
    // https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-dat|

    event.preventDefault();
    console.log(event);
    const data = [...event.target];
    console.log(data);
    data.forEach((_) => {
      console.log(_.value);
    });
  };

  render() {
    return (
      <div>
        <header className="py-4">
          <h3 className="text-center">
            Pavers React Developer Application Form
          </h3>
        </header>
        <div className="container">
          <ContactForm handleSubmit={(e) => this.handleOnSubmit(e)} />
        </div>
      </div>
    );
  }
}
