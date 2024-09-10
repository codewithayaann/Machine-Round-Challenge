import React from "react";
import "./App.css";

export const Form = ({ handler }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handler?.submit) return;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData)
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
                <label htmlFor="name">Country</label>
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

Form.defaultProps = {
  handler: {
    name: "Template form",
    submit: (e) => e.preventDefault(),
  },
};