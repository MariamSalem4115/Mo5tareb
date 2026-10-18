// Everything the pages ask about homes goes through this file.
//
// BACKEND NOTE: today these functions work on the sample data in data/listings.js, in memory.
// When the Node.js backend is ready, replace the BODY of each function with a request
// (keep the names and the shapes of what they return, and no page has to change):
//   searchListings(filters, sort) -> GET /api/listings?uni=&min=&max=&gender=&room=&amenities=&verified=&sort=
//   getListing(id)                -> GET /api/listings/:id
//   getLandlord(listing)          -> comes inside GET /api/listings/:id  (never include the phone number here)
// They will become async (return a Promise) at that point; the pages will then await them.

import { BUDGET, LANDLORDS, LISTINGS } from "../data/listings";

// What the filters start with: the first university, the full budget range, nothing else chosen.
export const DEFAULT_FILTERS = {
  uni: 0, // position in t.register.universities
  min: BUDGET.min,
  max: BUDGET.max,
  gender: "", // "" = any, or "women" | "men" | "any"(mixed homes)
  room: "", // "" = any, or "private" | "shared" | "entire"
  amenities: [], // ids from AMENITY_IDS; a home must have ALL of them
  verifiedOnly: false, // only homes whose landlord is identity-verified
  area: 0, // 0 = whole map, otherwise the map zoom level the student pressed "Search this area" at
};

export const getLandlord = (listing) => LANDLORDS[listing.landlord];
export const isVerifiedLandlord = (listing) => getLandlord(listing).verified;

export const getListing = (id) => LISTINGS.find((l) => l.id === id) ?? null;

// Homes that match the filters, boosted homes first, then by the chosen sort ("price" or "newest").
export function searchListings(filters, sort = "price") {
  const found = LISTINGS.filter(
    (l) =>
      l.uni === filters.uni &&
      l.price >= filters.min &&
      l.price <= filters.max &&
      (!filters.gender || l.gender === filters.gender) &&
      (!filters.room || l.room === filters.room) &&
      filters.amenities.every((a) => l.amenities.includes(a)) &&
      (!filters.verifiedOnly || isVerifiedLandlord(l)),
  );
  const byBoost = (a, b) => Number(b.boosted) - Number(a.boosted);
  const bySort = sort === "newest" ? (a, b) => b.added - a.added : (a, b) => a.price - b.price;
  return found.sort((a, b) => byBoost(a, b) || bySort(a, b));
}
