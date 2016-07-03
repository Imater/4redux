export function getTree(catalog) {
  const tree = {};

  Object.keys(catalog).forEach(id => {
    tree[id] = tree[id] ? tree[id] : {};
    Object.assign(tree[id], catalog[id]);
    const parentId = tree[id].IBLOCK_SECTION_ID;

    if (parentId) {
      if (!tree[parentId]) {
        tree[parentId] = {};
      }

      if (!tree[parentId].items) {
        tree[parentId].items = [];
      }

      tree[parentId].items.push(tree[id]);
    }
  });

  return tree;
}
