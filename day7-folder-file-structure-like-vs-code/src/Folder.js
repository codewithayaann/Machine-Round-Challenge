import React, { Fragment } from 'react'

export const Folder = ({
    node,
    fileFolderName,
    setFileFolderName,
    onFileFolderSave,
    handleAdd,
    parentIdType,
    onDelete
}) => {
    return (
        <section>
            <section className='d-flex folder-section'>
                <main className='name'>
                    {node.type === 'folder' ? '📁' : "📄"}{node.name}
                </main>

                <main className='buttons'>
                    {node.type === 'folder' && <Fragment>
                        <button onClick={() => handleAdd(node.id, 'file')}>+📄</button>
                        <button onClick={() => handleAdd(node.id, 'folder')}>+📁</button>
                    </Fragment>
                    }
                    <button onClick={() => onDelete(node.id)} className='delete'>X</button>
                </main>
            </section>
            {node.id === parentIdType.parentId && <input
                onChange={(e) => setFileFolderName(e.target.value)}
                value={fileFolderName}
                onKeyDown={onFileFolderSave}
            />}
        </section>
    )
}
