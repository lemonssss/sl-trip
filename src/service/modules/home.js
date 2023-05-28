import SLRequest from "../request";

export function getHomeHotSuggests() {
  return SLRequest.get({
    url: "/home/hotSuggests",
  });
}
