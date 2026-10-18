// Sample past stays for the "My reviews & stays" page (the text lives in i18n/staysPage.js, matched by id).
// The backend will send the real stays later.
// image = which room photo to show (index in IMG.rooms), kind = who gets reviewed, reviewed = already reviewed?
export const STAYS = {
  student: [
    { id: "dokki", price: 3500, image: 0, kind: "landowner", reviewed: false },
    { id: "giza", price: 2200, image: 1, kind: "landowner", reviewed: true },
  ],
  landowner: [
    { id: "dokki", price: 3500, image: 0, kind: "tenant", reviewed: false },
    { id: "heliopolis", price: 4200, image: 2, kind: "tenant", reviewed: true },
  ],
};
