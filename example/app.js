// LICENSE : MIT
"use strict";
import React from 'react';
import {render} from "react-dom";
import Container from "material-flux-container";
import UserContext from './UserContext.js';
const context = new UserContext();
export default class App extends React.Component {
    constructor(...args) {
        super(...args);
        this.userStore = context.userStore;
        this.state = {
            userData: this.userStore.getUserData()
        };
    }
    // Container require #getStores
    static getStores() {
        return [context.userStore]
    }
    // Container require #calculateState
    static calculateState(prevState) {
        return {
            userData: context.userStore.getUserData()
        }
    }

    onClick(event) {
        context.userAction.doSomething("clicked");
    }

    render() {
        return (
            <button onClick={this.onClick.bind(this)}>
                userData: {this.state.userData}
            </button>
        );
    }
}
// create container with `getStores` and `calculateState`
const container = Container.create(App);
render(
    React.createElement(container),
    document.getElementById("js-app")
);