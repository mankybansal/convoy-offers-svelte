import moment from "moment";

export function encodeOffer(decodedOffer) {
  return btoa(JSON.stringify(decodedOffer));
}

export function decodeOffer(encodedOffer) {
  return JSON.parse(atob(encodedOffer));
}

export function formatAppointment(stop) {
  return `${moment(stop.start).format("ddd DD/MM h:mma")} - ${moment(
    stop.end
  ).format("h:mma")}`;
}

export function formatPrice(offer) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Math.round(offer));
}

export function getStoredOffers() {
  const item = window.localStorage.getItem("requestedOffers");
  if (item) {
    return JSON.parse(item);
  }
  return {};
}

export function setStoredOffers(requestedOffers) {
  window.localStorage.setItem(
    "requestedOffers",
    JSON.stringify(requestedOffers)
  );
}
