import { useState } from 'react';
import './App.css';
import { FileTree } from './FileTree';
import { addItem, deleteNode } from './utils';


const initialData = [
  {
    id: "1",
    type: "folder",
    name: "src",
    children: [
      { id: "2", type: "file", name: "index.js" },
      {
        id: "3",
        type: "folder",
        name: "components",
        children: [
          { id: "4", type: "file", name: "Header.js" },
          { id: "5", type: "file", name: "Footer.js" },
        ],
      },
    ],
  },
  { id: "6", type: "file", name: "README.md" },
];


function App() {
  const [structure, setStructure] = useState(() => initialData)
  const [parentIdType, setParentIdType] = useState({
    parentId: null,
    type: ''
  })
  const [fileFolderName, setFileFolderName] = useState('')




  const handleAdd = (parentId, type) => {
    setParentIdType({
      parentId,
      type
    })
  }

  const onDelete = (nodeId) => {
    setStructure((prev) => deleteNode(prev, nodeId))
  }

  const onFileFolderSave = (event) => {
    if (event.key === 'Enter') {
      const newItem = {
        id: new Date().getTime(),
        name: fileFolderName,
        type: parentIdType.type,
        ...(parentIdType.type === 'folder' && {
          children: []
        })
      }
      setStructure(prev => addItem(prev, parentIdType.parentId, newItem))
      setParentIdType({
        parentId: null,
        type: ''
      })
      setFileFolderName('')
    }
  }


  return (
    <div className="App">
      <FileTree
        structure={structure}
        fileFolderName={fileFolderName}
        setFileFolderName={setFileFolderName}
        onFileFolderSave={onFileFolderSave}
        handleAdd={handleAdd}
        parentIdType={parentIdType}
        onDelete={onDelete}
      />
    </div>
  );
}

export default App;
