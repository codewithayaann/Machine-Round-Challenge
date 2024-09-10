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
