export const CATALOG_LINK = '/catalog-list/';
export const CATALOG_LIST_LINK = '/catalog-list-second-level/';

export function getBreadcrumbs(catalog, id) {
  const breadcrumbs = [];
  let parentId = id;
  let link;

  if (!catalog || !catalog[parentId]) {
    return [];
  }

  while (parentId) {
    const queryId = catalog[parentId].ID;
    if (catalog[parentId].IBLOCK_SECTION_ID) {
      link = CATALOG_LIST_LINK + catalog[parentId].IBLOCK_SECTION_ID;
    } else {
      link = CATALOG_LINK;
    }

    const breadcrumbItem = {
      title: catalog[parentId].NAME,
      pathname: link,
      query: {
        selected: queryId
      }
    };

    breadcrumbs.unshift(breadcrumbItem);
    parentId = catalog[parentId].IBLOCK_SECTION_ID;
  }

  breadcrumbs.unshift({
    title: 'Каталог',
    pathname: CATALOG_LINK
  });

  return breadcrumbs;
}
