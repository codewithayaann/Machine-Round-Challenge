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
