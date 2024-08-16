import React from 'react'

export const Column = ({ column, onDrop, onDragOver, columns, onDragStart, onDragEnd, onCreateNewItem }) => {
    return (
        <main
            key={column}
            className="column"
            onDrop={(event) => onDrop(event, column)}
            onDragOver={onDragOver}>
            <section>
                <h2>
                    <span className='heading'>{column}</span>
                    <span className='count'>({columns[column].length})</span>
                </h2>
                <ul className='list-parent'>
                    {columns[column].map((item, index) => (
                        <li
                            draggable
                            onDragStart={(event) => onDragStart(event, item, column, index)}
                            className="item"
                            onDragOver={onDragOver}
                            onDrop={(event) => onDrop(event, column, index)}
                            key={item}
                            onDragEnd={onDragEnd}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </section>
            <form className='new-item-input-form' onSubmit={(event) => onCreateNewItem(event, column)}>
                <input
                    placeholder="Add new item"
                    name={column}
                    className="new-item-input"
                />
            </form>
        </main>
    )
}
