export const addPropertyTableToItem = entities => item => {
  if (!item || !item.PROPERTY) {
    return item;
  }
  const propertyTableArray = [];
  Object.keys(item.PROPERTY).forEach(ind => {
    const property = entities.PROPERTY[ind];
    if (ind && property && property.VALUE && item.PROPERTY[ind]) {
      propertyTableArray.push({
        [ind]: property.VALUE[item.PROPERTY[ind]],
        value: property.VALUE[item.PROPERTY[ind]],
        title: property.TITLE
      });
    }
  });
  return (
  {
    ...item,
    propertyTableArray
  }
  );
};

export default (items, entities) => (items || []).map(addPropertyTableToItem(entities));
