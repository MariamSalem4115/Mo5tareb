import { AppProvider, useApp } from "./context/AppContext";
import { pages } from "./pages";
import ComingSoon from "./pages/ComingSoon";
import PageNavigator from "./components/PageNavigator";
import DialogHost from "./dialogs/DialogHost";

function Screen() {
  const { view } = useApp();
  const Page = pages[view] ?? ComingSoon;
  return <Page />;
}

export default function App() {
  return (
    <AppProvider>
      <Screen />
      <DialogHost />
      <PageNavigator />
    </AppProvider>
  );
}
