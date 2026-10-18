import { useApp } from "../context/AppContext";
import ReviewDialog from "./ReviewDialog";
import ReportDialog from "./ReportDialog";

// One place that shows whichever pop-up is open. It lives in App.jsx, so any page can open one:
//   const { openDialog } = useApp();
//   openDialog("review", { name: "...", listing: "..." })   or   openDialog("report", { title: "..." })
const DIALOGS = { review: ReviewDialog, report: ReportDialog };

export default function DialogHost() {
  const { dialog, closeDialog } = useApp();
  if (!dialog) return null;
  const Dialog = DIALOGS[dialog.type];
  return <Dialog data={dialog.data} onClose={closeDialog} />;
}
