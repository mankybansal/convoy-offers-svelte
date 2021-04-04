export function generateKey(offer) {
  return btoa(JSON.stringify(offer));
}
