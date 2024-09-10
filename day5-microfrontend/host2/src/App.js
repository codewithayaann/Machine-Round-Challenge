import React, { useState } from "react";
import { MicroFrontend } from "./MicroFrontend";

import "./App.css";

const { REACT_APP_FORM_HOST: formHost } = process.env;

export const App = ({ history }) => {
  const [data, setData] = useState()

  const handleSubmit = (data) => {
    setData(data)
  };

  const handler = {
    name: "From host 2",
    submit: handleSubmit,
  };

  return (
    <div className="container">
      <div>
        <h3 className="container">Micro frontend</h3>
        <MicroFrontend
          {...{
            history,
            host: formHost,
            name: "Form",
            handler,
          }}
        />
      </div>
      <div>form response : {JSON.stringify(data)}</div>
    </div>
  );
};

export default App;
