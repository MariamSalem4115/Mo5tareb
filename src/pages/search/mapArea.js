// "Search this area": which homes are inside the part of the map you can see.
// The map zooms around its centre, so at zoom level z you see the middle (100 / z)% of it.
// A pin is [x, y] in % of the map.
export const inArea = (pin, zoom) => {
  const half = 50 / zoom;
  return Math.abs(pin[0] - 50) <= half && Math.abs(pin[1] - 50) <= half;
};
