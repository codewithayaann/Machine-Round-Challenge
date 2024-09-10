## How to use?
1. clone this repo.
2. run `npm install` by going each of folder - ( form, host1, host2)
3. start app by `npm start` of each host. 

## PORT of each app
1. form - localhost:3000 - Must run this port on 3000 or you can do change from .env in host1, host2
2. host1 - localhost:3001
3. host2 - localhost:3002


## Microfrontend Architecture: Reusing a Form Component Across Multiple Hosts

This documentation covers how to use a `Form` as a microfrontend with `host1` and `host2` acting as a connector to render and manage the form component across multiple applications.

## Overview

The goal of this architecture is to allow reusability of the `Form` component in different host applications using microfrontend principles. Each host can dynamically load and render the form from a separate source (microfrontend) while passing in custom logic like handlers and states.

## Project Structure

Here’s the grammatically corrected version:

### 1. Webpack Override

First, install `react-app-rewired`:

```
npm install react-app-rewired
```

Next, create a file in the root directory called `config-overrides.js`:

```js
module.exports = {
  webpack: (config, env) => {
    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };

    config.output.filename = "static/js/[name].js";

    config.plugins[5].options.filename = "static/css/[name].css";
    config.plugins[5].options.moduleFilename = () => "static/css/main.css";
    return config;
  },
};
```

In `package.json`, replace the default `react-scripts` commands with the following commands for `start`, `build`, and `test`:

```json
"scripts": {
  "start": "PORT=3000 react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-app-rewired eject"
}
```

This setup overrides the default Webpack configuration, allowing for custom optimization and file naming strategies.

### 2. **Form Microfrontend**
   - A simple React component that can be embedded in any host via microfrontend architecture.
   - The form collects user input (name, email, city, country) and uses a handler to submit data.
   - The `handler` contains customizable logic for how the form behaves, allowing hosts to define how form submission and other interactions are handled.

```jsx
import React from "react";
import "./App.css";

export const Form = ({ handler }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handler?.submit) return;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    return handler.submit(data);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <h4 className="text-center mb-4">Hello {handler?.name}</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="name">Name - {handler.counter}</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="Enter your city"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  placeholder="Enter your country"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
```


# Understanding the `index.js` in Microfrontend

The `index.js` file plays a crucial role in managing the lifecycle of the microfrontend. It defines how the microfrontend is rendered and unmounted when integrated into host applications. Let’s walk through the code step by step to understand its functionality.

## Step 1: **Import React and Other Dependencies**

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

window.renderForm = (containerId, history, handler) => {
  const root = ReactDOM.createRoot(document.getElementById(containerId));
  root.render(<App {...{ handler, history }} />);
};

window.unmountForm = (containerId) => {
  const root = ReactDOM.createRoot(document.getElementById(containerId));
  root.unmount();
};

if (!document.getElementById("Form-container")) {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
}

```



This `window.renderForm` requires three parameters to function correctly:

- **containerId**: The ID of the DOM element where the microfrontend will be rendered.
- **history**: A history object, which allows navigation within the microfrontend.
- **handler**: A custom handler object passed from the host to manage events like form submission.

## Connector in Host


```jsx
import React, { useEffect } from "react";

export const MicroFrontend = ({ host, history, handler }) => {
  useEffect(() => {
    const scriptId = `micro-frontend-script-Form`;

    const renderMicroFrontend = () => {
      window[`renderForm`](`Form-container`, history, handler);
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    //host: localhost:3000 // form 
    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const script = document.createElement("script");
        script.id = scriptId;
        script.crossOrigin = "";
        script.src = `${host}${manifest.files["main.js"]}`;
        script.onload = () => {
          renderMicroFrontend();
        };
        document.head.appendChild(script);
      });

    return () => {
      window[`unmountForm`] && window[`unmountForm`](`Form-container`);
    };
  });

  return <main id={`Form-container`} />;
};

MicroFrontend.defaultProps = {
  document,
  window,
};


```

## use case

```jsx
import React, { useState } from "react";
import { MicroFrontend } from "./MicroFrontend";

import "./App.css";
const { REACT_APP_FORM_HOST: formHost } = process.env;

export const App = ({ history }) => {

  const [data, setData] = useState({})
  const [counter, setCounter] = useState(0)

  const handleSubmit = (data) => {
    setData(data)
  };


  const handler = {
    name: "From host1",
    submit: handleSubmit,
    counter,
  };

  return (
    <div className="container">
      <h3 className="container">Micro frontend</h3>
      <button onClick={() => setCounter(prev => prev + 1)}>Increment</button>
      <MicroFrontend
        {...{
          history,
          host: formHost,
          name: "Form",
          handler,
        }}
      />
      <div>form response : {JSON.stringify(data)}</div>
    </div>
  );
};

export default App;

```


