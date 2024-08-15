import { Fragment, useState } from 'react'
import './App.css';

function App() {
  const [columns, setColumns] = useState({
    column1: ['item1', 'item2'],
    column2: ['item3', 'item4']
  })

  const onDrop = (event, toColumn) => {
    const item = event.dataTransfer.getData('item')
    const fromColumn = event.dataTransfer.getData('fromColumn')

    if (toColumn === fromColumn) return;

    setColumns((prev) => {
      const fromData = prev[fromColumn].filter((older) => older !== item);
      const toData = [...prev[toColumn], item]
      return {
        ...prev,
        [fromColumn]: fromData,
        [toColumn]: toData
      }
    })
  }

  const onDragOver = (event) => event.preventDefault()

  const onDragStart = (event, item, fromColumn) => {
    event.dataTransfer.setData('item', item)
    event.dataTransfer.setData('fromColumn', fromColumn)
  }

  const onCreateNewItem = (event, column) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target))
    // {column: abcd}
    setColumns((prev) => ({
      ...prev,
      [column]: [...prev[column], data[column]]
    }))
    event.target.reset()
  }


  const createColumn = () => {
    const totalColumns = Object.keys(columns).length;
    const newColumnName = `column${totalColumns + 1}`
    setColumns(prev => ({
      ...prev,
      [newColumnName]: []
    }))
  }

  return (
    <Fragment>
      <div className="container">
        {Object.keys(columns).map((column) => (
          <div
            key={column}
            className='column'
            onDrop={(event) => onDrop(event, column)}
            onDragOver={onDragOver}>
            {columns[column].map((item) => (
              <div
                draggable
                onDragStart={(event) => onDragStart(event, item, column)}
                className='item'
                key={item}>
                {item}
              </div>
            ))}
            <form onSubmit={(event) => onCreateNewItem(event, column)}>
              <input placeholder='Pleas create new item' name={column} />
            </form>
          </div>
        ))}
      </div>
      <button onClick={createColumn}>Create Column + </button>
    </Fragment>
  );
}

export default App;
