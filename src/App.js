import React, { Component } from "react";
import "./App.scss";
import ContactForm from "./components/contactForm";
import LandingBackground from "./components/landingBackground";

export default class App extends Component {
  state = {};
  componentDidMount() {}

  render() {
    return (
      <div>
        <LandingBackground />
        <div className="container">
          <section className="my-5">
            <ContactForm />
          </section>
        </div>
      </div>
    );
  }
}
