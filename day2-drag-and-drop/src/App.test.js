import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [columns, setColumns] = useState({
    column1: ["Item 1", "Item 2"],
    column2: ["Item 3", "Item 4"],
    column3: ["Item 5", "Item 6"],
  });

  const handleDragStart = (e, item, fromColumn) => {
    e.dataTransfer.setData("item", item);
    e.dataTransfer.setData("fromColumn", fromColumn);
  };

  const handleDrop = (e, toColumn) => {
    const item = e.dataTransfer.getData("item");
    const fromColumn = e.dataTransfer.getData("fromColumn");

    if (fromColumn === toColumn) return;

    setColumns((prevState) => {
      const newFromColumn = prevState[fromColumn].filter((i) => i !== item);
      const newToColumn = [...prevState[toColumn], item];
      return {
        ...prevState,
        [fromColumn]: newFromColumn,
        [toColumn]: newToColumn,
      };
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <div className="container">
        {Object.keys(columns).map((column) => (
          <div
            className="column"
            onDrop={(e) => handleDrop(e, column)}
            onDragOver={handleDragOver}
            key={column}
          >
            {columns[column].map((item, index) => (
              <div
                key={index}
                className="item"
                draggable
                onDragStart={(e) => handleDragStart(e, item, column)}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default App;
