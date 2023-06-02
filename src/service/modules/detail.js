import SLRequest from "../request";

export function getDetailInfos(houseId) {
  return SLRequest.get({
    url: "/detail/infos",
    params: {
      houseId,
    },
  });
}
