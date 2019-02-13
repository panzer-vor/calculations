const treeNodes = [
  {
    pid: 0,
    id: 1,
    name: 'a'
  },
  {
    pid: 1,
    id: 2,
    name: 'b'
  },
  {
    pid: 2,
    id: 3,
    name: 'c'
  },
  {
    pid: 0,
    id: 4,
    name: 'd'
  }
]

const parserTree = (tree) => {
  const treeMap = {}
  for (const node of tree) {
    treeMap[node.id] = node
  }
  const treeNode = []
  tree.forEach(node => {
    const pnode = treeMap[node.pid]
    if (pnode) {
      (pnode.children || (pnode.children = [])).push(node)
    } else {
      treeNode.push(node)
    }
  })
  return treeNode
}
console.log(parserTree(treeNodes)[0])

