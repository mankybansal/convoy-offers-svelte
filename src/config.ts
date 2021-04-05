export const sortOptions = [
  { value: "pickupDate", label: "Pickup Date" },
  { value: "dropoffDate", label: "Dropoff Date" },
  { value: "price", label: "Price" },
  { value: "origin", label: "Origin" },
  { value: "destination", label: "Destination" },
  { value: "miles", label: "Miles" },
];

export const sortOrderOptions = [
  { value: "asc", label: "Asc" },
  { value: "desc", label: "Desc" },
];

export const DEFAULT_OFFSET = 0;
export const DEFAULT_LIMIT = 3;
export const DEFAULT_SORT_ORDER = "desc";
export const DEFAULT_SORT = "pickupDate";

export const BASE_API_URL = "https://convoy-mock-api.herokuapp.com/offers";
