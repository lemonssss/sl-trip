import SLRequest from "../request";

export function getHomeHotSuggests() {
  return SLRequest.get({
    url: "/home/hotSuggests",
  });
}

export function getHomeCategories() {
  return SLRequest.get({
    url: "/home/categories",
  });
}

export function getHomeHouselist(currentPage) {
  return SLRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage,
    },
  });
}
