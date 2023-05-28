import SLRequest from "../request";

export function getCityAll() {
  return SLRequest.get({
    url: "/city/all",
  });
}
