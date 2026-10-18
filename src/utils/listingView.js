// Turns a home from data/listings.js (numbers and ids) into one object that also has the WORDS in the
// current language, so cards and pages can just show it.
import { LANDLORDS } from "../data/listings";
import { fill } from "./format";

const ROOM_LABEL = { private: 0, shared: 1, entire: 2 }; // position in t.search.rooms

export function listingView(t, n, listing) {
  const text = t.listings.items[listing.id];
  const landlord = LANDLORDS[listing.landlord];
  const university = t.register.universities[listing.uni];
  return {
    ...listing,
    ...text, // title, area, address, headline, desc, stop
    university,
    typeLabel: t.search.rooms[ROOM_LABEL[listing.room]],
    genderLabel: t.listings.gender[listing.gender],
    distance: fill(t.listings.distance[listing.by], { min: n(listing.walk), uni: university }),
    verified: landlord.verified,
    landlordInfo: { ...landlord, ...t.listings.landlords[landlord.id] },
  };
}

// The small object the shared ListingCard needs (landing page, landlord profile).
export const cardItem = (t, n, listing) => {
  const v = listingView(t, n, listing);
  return { id: v.id, title: v.title, area: v.area, type: v.typeLabel, distance: v.distance, price: v.price, gender: v.genderLabel, rating: v.rating, verified: v.verified };
};
