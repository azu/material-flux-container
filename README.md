# material-flux-container

Provide `Container` Component for [material-flux](https://github.com/azu/material-flux "material-flux").

## Installation

    npm install material-flux-container

Dependencies

- material-flux
- React

## Usage

`Container` has same API to [Flux Utils](https://facebook.github.io/flux/docs/flux-utils.html "Flux Utils").

### `Container.create(base: ReactClass): ReactClass`

Create is used to transform a react class into a container that updates its state when relevant stores change.
The provided base class must have static methods `getStores()` and `calculateState()`.

### Example

See [example/](example/)

```js
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
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT