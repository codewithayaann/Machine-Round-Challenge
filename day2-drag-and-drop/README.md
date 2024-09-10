# React JS Drag and Drop Without Libraries

YT VIDEO : https://youtu.be/W3oxPPuIOfw?si=XDxyeQfA3-XWvZWr

## Overview

This project demonstrates how to create a simple drag-and-drop interface using React.js without relying on any external libraries. We use built-in JavaScript functions and HTML properties to manage drag events and state transitions.

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [Understanding the Code](#understanding-the-code)
    - [Initial State Setup](#initial-state-setup)
    - [Handling Drag and Drop Events](#handling-drag-and-drop-events)
    - [Creating New Items](#creating-new-items)
    - [Adding New Columns](#adding-new-columns)
3. [Use Case](#use-case)

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/react-drag-and-drop.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd react-drag-and-drop
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

## Understanding the Code

### Initial State Setup

We start by defining the initial state using the `useState` hook to manage the columns and their respective items.

```javascript
const [columns, setColumns] = useState({
  column1: ['item1', 'item2'],
  column2: ['item3', 'item4']
});
```

- **columns**: An object representing multiple columns, each containing an array of items.

### Handling Drag and Drop Events

The drag-and-drop functionality is managed through three key functions: `onDragStart`, `onDrop`, and `onDragOver`.

#### onDragStart

This function is triggered when an item is dragged. It stores the item's data and its originating column.

```javascript
const onDragStart = (event, item, fromColumn) => {
  event.dataTransfer.setData('item', item);
  event.dataTransfer.setData('fromColumn', fromColumn);
};
```

#### onDrop

This function handles dropping the item into the target column. It checks if the item is being dropped in a different column and then updates the state accordingly.

```javascript
const onDrop = (event, toColumn) => {
  const item = event.dataTransfer.getData('item');
  const fromColumn = event.dataTransfer.getData('fromColumn');

  if (toColumn === fromColumn) return;

  setColumns((prev) => {
    const fromData = prev[fromColumn].filter((older) => older !== item);
    const toData = [...prev[toColumn], item];
    return {
      ...prev,
      [fromColumn]: fromData,
      [toColumn]: toData
    };
  });
};
```

#### onDragOver

This function allows the drop by preventing the default behavior.

```javascript
const onDragOver = (event) => event.preventDefault();
```

### Creating New Items

You can create new items within a column using a simple form. The `onCreateNewItem` function handles the form submission, updating the column with the new item.

```javascript
const onCreateNewItem = (event, column) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  setColumns((prev) => ({
    ...prev,
    [column]: [...prev[column], data[column]]
  }));
  event.target.reset();
};
```

### Adding New Columns

Users can dynamically add new columns by clicking a button. The `createColumn` function generates a new column with an empty array of items.

```javascript
const createColumn = () => {
  const totalColumns = Object.keys(columns).length;
  const newColumnName = `column${totalColumns + 1}`;
  setColumns(prev => ({
    ...prev,
    [newColumnName]: []
  }));
};
```

## Use Case

This project is a great starting point for building more complex drag-and-drop interfaces in React. Whether you're creating a Kanban board, a sortable list, or a task management app, understanding these core principles will help you implement efficient and intuitive drag-and-drop experiences.
