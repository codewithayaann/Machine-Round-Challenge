import { Fragment, useState } from 'react';
import { Column } from './Column';
import './App.css';

function App() {
  const [columns, setColumns] = useState({
    column1: ['item1', 'item2'],
    column2: ['item3', 'item4']
  });

  const swapItems = (fromColumn, fromIndex, toColumn, toIndex) => {
    const fromData = columns[fromColumn];
    const toData = columns[toColumn];

    if (fromColumn === toColumn) {
      [fromData[toIndex], fromData[fromIndex]] = [fromData[fromIndex], fromData[toIndex]];
    } else {
      const [item] = fromData.splice(fromIndex, 1);
      toData.splice(toIndex, 0, item);
    }

    setColumns((prev) => ({
      ...prev,
      [fromColumn]: fromData,
      [toColumn]: toData
    }));
  };


  const onDrop = (event, toColumn, toIndex) => {
    event.stopPropagation();
    const item = event.dataTransfer.getData('item');
    const fromColumn = event.dataTransfer.getData('fromColumn');
    const fromIndex = parseInt(event.dataTransfer.getData('fromIndex'), 10);

    //animation
    event.target.classList.add('dropping');
    setTimeout(() => {
      event.target.classList.remove('dropping');
    }, 200);

    if (typeof toIndex !== 'number') {
      // Drop on column, append to end and remove from original column
      setColumns((prev) => {
        const newColumns = { ...prev };
        newColumns[toColumn] = [...newColumns[toColumn], item];
        newColumns[fromColumn] = newColumns[fromColumn].filter((_, i) => i !== fromIndex);
        return newColumns;
      });
    } else {
      // swap if same column or swapping from another column
      swapItems(fromColumn, fromIndex, toColumn, toIndex);
    }

  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDragEnd = (event) => {
    event.target.classList.remove('dragging');
  }

  const onDragStart = (event, item, fromColumn, fromIndex) => {
    event.dataTransfer.setData('item', item);
    event.dataTransfer.setData('fromColumn', fromColumn);
    event.dataTransfer.setData('fromIndex', fromIndex);
    event.target.classList.add('dragging');
  };

  const onCreateNewItem = (event, column) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    setColumns((prev) => ({
      ...prev,
      [column]: [...prev[column], data[column]]
    }));
    event.target.reset();
  };

  const createColumn = () => {
    const totalColumns = Object.keys(columns).length;
    const newColumnName = `column${totalColumns + 1}`;
    setColumns((prev) => ({
      ...prev,
      [newColumnName]: []
    }));
  };

  return (
    <Fragment>
      <div className="board">
        <div className="columns">
          {Object.keys(columns).map((column) => (
            <Column {...{
              column,
              onDrop,
              onDragOver,
              columns,
              onDragStart,
              onDragEnd,
              onCreateNewItem
            }} />
          ))}
        </div>
        <button onClick={createColumn} className="add-column-btn">
          + Add Column
        </button>
      </div >
    </Fragment >
  );
}

export default App;