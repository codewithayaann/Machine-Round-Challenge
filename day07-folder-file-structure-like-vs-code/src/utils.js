export function addItem(trees, parentId, newItem) {
    return trees.map((node) => {
        if (node.id === parentId && node.type === 'folder') {
            return {
                ...node,
                children: [...(node.children || []), newItem]
            }
        } else if (node.children) {
            return {
                ...node,
                children: addItem(node.children, parentId, newItem)
            }
        }
        return node;
    })
}


export function deleteNode(trees, nodeId) {
    return trees.map((node) => {
        if (node.children) {
            return {
                ...node,
                children: deleteNode(node.children, nodeId)
            }
        }
        return node;
    }).filter(node => node.id !== nodeId)
}

