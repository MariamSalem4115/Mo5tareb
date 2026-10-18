// Sample numbers and dates for the User Dashboard.
// The Node.js backend will send the real ones later.
export const DASH = {
  rating: 4.9, // average rating
  ratingsCount: 12, // how many ratings in total
  givenCount: 8, // reviews this user wrote
  bioMax: 500, // maximum characters in the bio
  boostPrice: 149, // EGP for a 7-day boost
  expiryDays: 30, // listings expire after this many days
  savedAt: new Date(2026, 9, 6, 10, 42), // "last saved" (months start at 0, so 9 = October)
  docs: {
    id: { status: "approved", date: new Date(2026, 9, 2) },
    student: { status: "pending", date: new Date(2026, 9, 6) },
  },
};
