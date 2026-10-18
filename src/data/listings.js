// Sample homes for the Search page, the Listing details page, the landing page and landlord profiles.
// The Node.js backend will send the real ones later (see services/listings.js for the calls to replace).
//
// Only numbers, ids and yes/no values live here. Every WORD (titles, areas, descriptions) lives in
// i18n/listingsPage.js under t.listings.items[<id>], so the two languages stay in sync.

// Which university each listing belongs to: position in t.register.universities
// (0 = Cairo University, 1 = Ain Shams, 2 = Alexandria, 3 = Al-Azhar).

// Budget slider limits, in EGP per month (used by the landing search bar and the Search page).
export const BUDGET = { min: 1000, max: 8000, step: 100, gap: 500 };

// How many homes the Search page shows before "Load more homes".
export const PAGE_SIZE = 4;

// The amenities a home can have, in the order they are listed.
export const AMENITY_IDS = ["wifi", "ac", "fan", "furnished", "laundry", "kitchen"];

// Landlords. Names and short bios are in t.listings.landlords[<id>].
//  verified = identity document approved by the admin team
//  phone    = SAMPLE number. The backend must only send the real number to verified students at the moment they press "Reveal".
export const LANDLORDS = [
  { id: "salma", img: "owner", verified: true, since: 2024, properties: 4, rating: 4.9, reviews: 24, phone: "+20 100 555 0142" },
  { id: "mahmoud", img: "", verified: true, since: 2023, properties: 3, rating: 4.7, reviews: 15, phone: "+20 100 555 0177" },
  { id: "dina", img: "", verified: true, since: 2025, properties: 3, rating: 4.8, reviews: 9, phone: "+20 100 555 0193" },
  { id: "tarek", img: "", verified: false, since: 2026, properties: 2, rating: 4.4, reviews: 3, phone: "+20 100 555 0108" },
];

// Homes.
//  uni       = position in t.register.universities        landlord = position in LANDLORDS
//  gender    = "women" | "men" | "any"                      room     = "private" | "shared" | "entire"
//  by        = how students get to campus: "walk" | "metro" | "bus"      walk = minutes to campus
//  metro/shop= minutes on foot to the nearest stop / supermarket
//  pin       = [x, y] position on the illustrative map, in % of the map
//  photos    = positions in IMG.rooms (the order the gallery shows them)
//  boosted   = the landlord paid for a boost, so it is shown first      added = date it was published
//  electricity = "shared" (split between tenants, not included) | "included" | "tenant" (paid by you)
export const LISTINGS = [
  { id: "dokki", uni: 0, landlord: 0, price: 3500, deposit: 3500, gender: "women", room: "private", amenities: ["wifi", "ac", "fan", "furnished", "laundry", "kitchen"], rating: 4.9, reviews: 24, by: "walk", walk: 12, metro: 6, shop: 2, pin: [47, 58], photos: [0, 1, 2], boosted: true, added: new Date(2026, 9, 12), residents: 3, floor: 3, elevator: true, minStay: 3, internetWater: true, electricity: "shared", rules: ["quiet", "noSmoking", "cleaning"] },
  { id: "balcony", uni: 0, landlord: 0, price: 3800, deposit: 3800, gender: "women", room: "private", amenities: ["wifi", "ac", "furnished", "laundry", "kitchen"], rating: 4.9, reviews: 18, by: "metro", walk: 8, metro: 4, shop: 3, pin: [33, 33], photos: [1, 0, 2], boosted: false, added: new Date(2026, 9, 9), residents: 3, floor: 2, elevator: false, minStay: 3, internetWater: true, electricity: "shared", rules: ["quiet", "noSmoking", "cleaning"] },
  { id: "agouza", uni: 0, landlord: 0, price: 4100, deposit: 4100, gender: "women", room: "private", amenities: ["wifi", "ac", "fan", "furnished", "kitchen"], rating: 4.8, reviews: 12, by: "bus", walk: 15, metro: 9, shop: 4, pin: [74, 26], photos: [2, 0, 1], boosted: false, added: new Date(2026, 9, 14), residents: 4, floor: 4, elevator: true, minStay: 6, internetWater: true, electricity: "included", rules: ["quiet", "noSmoking", "noPets"] },
  { id: "agouza-shared", uni: 0, landlord: 0, price: 2400, deposit: 2400, gender: "women", room: "shared", amenities: ["wifi", "fan", "furnished", "kitchen"], rating: 4.6, reviews: 8, by: "walk", walk: 18, metro: 8, shop: 3, pin: [62, 47], photos: [0, 2, 1], boosted: false, added: new Date(2026, 8, 28), residents: 4, floor: 1, elevator: false, minStay: 3, internetWater: true, electricity: "shared", rules: ["quiet", "noSmoking", "cleaning"] },
  { id: "giza", uni: 0, landlord: 1, price: 2200, deposit: 2200, gender: "men", room: "shared", amenities: ["wifi", "fan", "furnished", "kitchen"], rating: 4.7, reviews: 11, by: "metro", walk: 8, metro: 3, shop: 2, pin: [38, 72], photos: [2, 1, 0], boosted: false, added: new Date(2026, 9, 3), residents: 4, floor: 2, elevator: false, minStay: 3, internetWater: false, electricity: "shared", rules: ["quiet", "noSmoking", "midnight"] },
  { id: "mohandessin", uni: 0, landlord: 1, price: 3200, deposit: 3200, gender: "men", room: "private", amenities: ["wifi", "ac", "furnished", "kitchen"], rating: 4.5, reviews: 6, by: "bus", walk: 15, metro: 10, shop: 5, pin: [80, 60], photos: [1, 2, 0], boosted: false, added: new Date(2026, 9, 1), residents: 3, floor: 5, elevator: true, minStay: 6, internetWater: true, electricity: "tenant", rules: ["quiet", "noSmoking"] },
  { id: "faisal", uni: 0, landlord: 3, price: 5000, deposit: 5000, gender: "any", room: "entire", amenities: ["wifi", "ac", "furnished", "kitchen", "laundry"], rating: 4.4, reviews: 3, by: "bus", walk: 20, metro: 12, shop: 4, pin: [14, 46], photos: [0, 1, 2], boosted: false, added: new Date(2026, 9, 15), residents: 3, floor: 3, elevator: true, minStay: 6, internetWater: false, electricity: "tenant", rules: ["noSmoking", "noPets"] },
  { id: "dokki-flat", uni: 0, landlord: 3, price: 7500, deposit: 7500, gender: "any", room: "entire", amenities: ["wifi", "ac", "fan", "furnished", "laundry", "kitchen"], rating: 4.6, reviews: 5, by: "walk", walk: 10, metro: 5, shop: 2, pin: [58, 76], photos: [1, 0, 2], boosted: false, added: new Date(2026, 9, 10), residents: 5, floor: 2, elevator: true, minStay: 6, internetWater: true, electricity: "tenant", rules: ["noSmoking", "noPets"] },
  { id: "abbasia", uni: 1, landlord: 2, price: 3000, deposit: 3000, gender: "men", room: "private", amenities: ["wifi", "fan", "furnished", "kitchen"], rating: 4.7, reviews: 10, by: "walk", walk: 6, metro: 5, shop: 2, pin: [50, 45], photos: [2, 0, 1], boosted: false, added: new Date(2026, 9, 6), residents: 3, floor: 2, elevator: false, minStay: 3, internetWater: true, electricity: "shared", rules: ["quiet", "noSmoking", "midnight"] },
  { id: "heliopolis", uni: 1, landlord: 1, price: 4200, deposit: 4200, gender: "women", room: "private", amenities: ["wifi", "ac", "furnished", "laundry", "kitchen"], rating: 4.8, reviews: 14, by: "metro", walk: 12, metro: 6, shop: 3, pin: [70, 30], photos: [0, 2, 1], boosted: false, added: new Date(2026, 8, 30), residents: 3, floor: 4, elevator: true, minStay: 3, internetWater: true, electricity: "shared", rules: ["quiet", "noSmoking", "cleaning"] },
  { id: "shatby", uni: 2, landlord: 2, price: 2800, deposit: 2800, gender: "women", room: "private", amenities: ["wifi", "fan", "furnished", "kitchen"], rating: 4.8, reviews: 9, by: "walk", walk: 10, metro: 4, shop: 2, pin: [45, 50], photos: [1, 2, 0], boosted: false, added: new Date(2026, 9, 8), residents: 3, floor: 3, elevator: false, minStay: 3, internetWater: true, electricity: "shared", rules: ["quiet", "noSmoking", "cleaning"] },
  { id: "nasr", uni: 3, landlord: 2, price: 4200, deposit: 4200, gender: "women", room: "private", amenities: ["wifi", "ac", "furnished", "laundry", "kitchen"], rating: 4.8, reviews: 13, by: "bus", walk: 10, metro: 7, shop: 3, pin: [55, 40], photos: [2, 1, 0], boosted: false, added: new Date(2026, 9, 11), residents: 4, floor: 5, elevator: true, minStay: 3, internetWater: true, electricity: "included", rules: ["quiet", "noSmoking"] },
];

// The three homes shown on the landing page ("Picked for your next chapter").
export const FEATURED_IDS = ["dokki", "giza", "nasr"];
