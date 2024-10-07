import React from 'react'
import { Folder } from './Folder'

export const FileTree = ({
    structure,
    fileFolderName,
    setFileFolderName,
    onFileFolderSave,
    handleAdd,
    parentIdType,
    onDelete
}) => {
    return structure.map((node) => {
        return (
            <div div key={node.id} className='folder'>
                <Folder {...{
                    node,
                    fileFolderName,
                    setFileFolderName,
                    onFileFolderSave,
                    handleAdd,
                    parentIdType,
                    onDelete
                }} />
                {Array.isArray(node.children) &&
                    <FileTree
                        {...{
                            structure: node.children,
                            fileFolderName,
                            setFileFolderName,
                            onFileFolderSave,
                            handleAdd,
                            parentIdType,
                            onDelete
                        }}
                    />
                }
            </div>)
    })
}
