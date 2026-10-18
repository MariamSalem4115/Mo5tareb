import { fill, todayISO } from "../../utils/format";
import { hasContactInfo, parseAmount } from "../../utils/validators";
import { LISTING } from "../../data/listing";

// Checks the whole Add Listing form and returns an object of error messages.
// An empty object {} means everything is fine. Each key matches a field (name, rent, photos, ...).
// The backend must run the same checks again later.
export function validateListing({ form, photos, doc, agree, t, n }) {
  const e = {};
  const shared = t.errors; // messages used all over the site ("required", "doc")
  const m = t.addListing.errors; // messages that belong to this page

  // A whole number between min and max? (Arabic digits and commas are understood.)
  const whole = (value, min, max) => {
    const x = parseAmount(value);
    return x >= min && x <= max;
  };
  const need = (key) => { if (!String(form[key]).trim()) e[key] = shared.required; };

  // 1. Property details
  const name = form.name.trim();
  if (!name) e.name = shared.required;
  else if (name.length < LISTING.titleMin) e.name = fill(m.nameShort, { min: n(LISTING.titleMin) });
  else if (hasContactInfo(name)) e.name = m.contact;
  need("type");
  if (!form.area.trim()) e.area = shared.required;
  else if (!whole(form.area, 1, LISTING.areaMax)) e.area = m.area;
  need("floor");
  need("bathrooms");
  const description = form.description.trim();
  if (!description) e.description = shared.required;
  else if (description.length < LISTING.descMin) e.description = fill(m.descShort, { min: n(LISTING.descMin) });
  else if (hasContactInfo(description)) e.description = m.contact;

  // 2. Location and university
  need("governorate");
  need("district");
  if (!form.street.trim()) e.street = shared.required;
  else if (hasContactInfo(form.street)) e.street = m.contact;
  need("university");
  if (!form.walk.trim()) e.walk = shared.required;
  else if (!whole(form.walk, 1, LISTING.walkMax)) e.walk = m.walk;
  need("address");

  // 3. Rent and bills (a deposit of 0 is fine: it means "no deposit")
  if (!form.rent.trim()) e.rent = shared.required;
  else if (!whole(form.rent, 1, LISTING.rentMax)) e.rent = m.amount;
  if (!form.deposit.trim()) e.deposit = shared.required;
  else if (!whole(form.deposit, 0, LISTING.rentMax)) e.deposit = m.amount;
  need("internetWater");
  need("electricityGas");
  need("minStay");
  // Dates look like "2026-10-17", so comparing them as plain text works.
  if (!form.from) e.from = shared.required;
  else if (form.from < todayISO()) e.from = m.pastDate;
  if (hasContactInfo(form.extra)) e.extra = m.contact;

  // 4. Occupancy
  if (!form.residents.trim()) e.residents = shared.required;
  else if (!whole(form.residents, 1, LISTING.residentsMax)) e.residents = m.count;
  if (!form.places.trim()) e.places = shared.required;
  else if (!whole(form.places, 1, LISTING.residentsMax)) e.places = m.count;
  else if (!e.residents && parseAmount(form.places) > parseAmount(form.residents)) e.places = m.placesMax;
  need("group");
  need("perRoom");

  // 5. Notes
  if (hasContactInfo(form.notes)) e.notes = m.contact;

  // 6. Photos
  if (photos.length < LISTING.photosMin) e.photos = fill(m.photos, { min: n(LISTING.photosMin) });

  // 7. Proof of ownership
  need("ownerRole");
  if (!doc) e.doc = shared.doc;

  if (!agree) e.agree = m.confirm;
  return e;
}
