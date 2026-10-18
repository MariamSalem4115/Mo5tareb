# Mo5tareb front end: notes for the back-end team

The front end is a React SPA (Vite + Tailwind). Everything works with **sample data in memory**, so nothing is saved after a refresh.
Every place where the server is needed is marked in the code with a comment that starts with **`Simulation:`** or **`BACKEND NOTE`**.
Search for those two words in VS Code (Ctrl + Shift + F) to find them all.

## Where the data comes from today

| What | File (today) | Replace with |
|---|---|---|
| Homes, landlords | `data/listings.js`, read only through `services/listings.js` | `GET /api/listings`, `GET /api/listings/:id` |
| Home text (title, description) | `i18n/listingsPage.js` -> `t.listings.items[id]` | stored in the database (ar + en, or one language + translation) |
| Notifications | `data/notifications.js`, read through `hooks/useNotifications.js` | `GET /api/notifications` |
| Saved homes | `savedIds` in `context/AppContext.jsx` | `PUT/DELETE /api/me/saved/:listingId` |
| "Is this student verified?" | `verified` in `context/AppContext.jsx` (test switch in the compass menu) | comes from the logged-in user |
| Login, role | `loggedIn`, `role` in `context/AppContext.jsx` | real auth (session/JWT); the **server** must enforce roles |
| Students (Roommates) | `data/roommates.js` | `GET /api/students` |
| Dashboard numbers | `data/dashboard.js`, `data/stays.js` | `GET /api/me/...` |

## Search (services/listings.js)

`searchListings(filters, sort)` receives:

```
{ uni, min, max, gender: ""|"women"|"men"|"any", room: ""|"private"|"shared"|"entire",
  amenities: ["wifi","ac","fan","furnished","laundry","kitchen"] (must have ALL),
  verifiedOnly: boolean }
sort: "price" | "newest"      boosted homes always come first
```
"Search this area" (`filters.area`) is only a map helper today; with a real map send the visible bounding box instead.
The functions will become `async`; the pages will then need `await` (small change in `pages/Search.jsx` and `pages/Listing.jsx`).

## Contact numbers (important for privacy)

`pages/listing/ContactCard.jsx`: the landlord phone must **never** be in the normal listing response.
Send it only after the student presses "Reveal", and only if the logged-in user is a **verified student**
(for example `POST /api/listings/:id/reveal-contact`). The front end hides the button for others, but that is only a courtesy.

## Other rules the server must repeat

- An account is a student **or** a landowner, never both. Add Listing and Listings Management are for landowners only.
- Contact details (phone/email) are refused inside public text by `hasContactInfo` in `utils/validators.js`; repeat it on the server.
- All validation in `utils/validators.js`, `pages/addListing/validate.js` and the forms is a courtesy only.
- No rent is paid inside the app. A landlord asking for payment in their own way is not a report reason.
- Uploads (documents, listing photos): max 10 MB, jpg/png/pdf (`utils/files.js`). Check type and size on the server too.
- Reviews are written after a stay; the review window says "within 24 hours" (policy text, can be changed in `i18n/`).

## To delete before launch

- `<PageNavigator />` in `App.jsx` (the compass test menu) and the "Preview as" / verification switches inside it.
- The sample support email in `data/support.js`.
