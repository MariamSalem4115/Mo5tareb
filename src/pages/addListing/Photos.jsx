import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { LISTING } from "../../data/listing";
import SectionCard from "../../components/SectionCard";
import PhotoUploader from "../../components/PhotoUploader";

// Step 6: listing photos. The real work happens in the PhotoUploader component.
export default function Photos({ photos, error, onChange }) {
  const { t, n } = useApp();
  const sub = fill(t.addListing.photos.sub, { n: n(photos.length), max: n(LISTING.photosMax), min: n(LISTING.photosMin) });
  return (
    <SectionCard id="listing-step-6" step={6} title={`${t.addListing.steps[5]} *`} sub={sub}>
      <PhotoUploader photos={photos} error={error} onChange={onChange} />
    </SectionCard>
  );
}
