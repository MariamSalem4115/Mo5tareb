// Sample students for the Roommates page and their public profiles.
// The Node.js backend will send real students later.
// Names, study fields, cities and bios are in i18n/roommatesPage.js (same order as this list).
//  university = position in t.register.universities (0 = Cairo University, 1 = Ain Shams ...)
//  year       = position in t.dashboard.bio.years (0 = BSc Year 1 ...)
//  options    = positions in t.dashboard.bio.options (the lifestyle chips of the Bio card)
//  img        = a key of IMG in data/images.js, or "" when there is no photo (the first letter is shown instead)
export const PEOPLE = [
  { id: "mariam", age: 21, university: 0, year: 2, group: "women", budget: 3500, options: [0, 1, 2], rating: 4.9, reviews: 7, img: "mariam", since: new Date(2026, 2, 1) },
  { id: "nour", age: 20, university: 1, year: 1, group: "women", budget: 3000, options: [0, 3, 7], rating: 4.8, reviews: 4, img: "nour", since: new Date(2026, 4, 1) },
  { id: "youssef", age: 22, university: 2, year: 3, group: "men", budget: 2500, options: [0, 6, 4], rating: 4.6, reviews: 5, img: "", since: new Date(2026, 1, 1) },
  { id: "ahmed", age: 23, university: 3, year: 3, group: "men", budget: 2000, options: [1, 2, 7], rating: 4.7, reviews: 3, img: "", since: new Date(2026, 5, 1) },
  { id: "salma", age: 19, university: 4, year: 0, group: "women", budget: 2800, options: [0, 2, 3, 7], rating: 4.9, reviews: 2, img: "", since: new Date(2026, 7, 1) },
  { id: "omar", age: 24, university: 5, year: 4, group: "men", budget: 3200, options: [0, 4, 6, 5], rating: 4.5, reviews: 6, img: "", since: new Date(2026, 0, 1) },
  { id: "layla", age: 22, university: 0, year: 3, group: "women", budget: 4200, options: [0, 3, 7, 2], rating: 5.0, reviews: 9, img: "", since: new Date(2025, 10, 1) },
  { id: "karim", age: 21, university: 1, year: 2, group: "men", budget: 3600, options: [5, 6, 4], rating: 4.4, reviews: 3, img: "", since: new Date(2026, 8, 1) },
];

// Budget steps offered in the filter (EGP per month).
export const BUDGET_STEPS = [2000, 3000, 4000, 5000];
