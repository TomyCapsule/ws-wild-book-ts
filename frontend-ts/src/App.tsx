import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { WildersListProvider } from "./context/WildersList";
import MainContent from "./pages";

function App() {
  return (
    <div>
      <Header />
      <WildersListProvider>
        <MainContent />
      </WildersListProvider>
      <Footer />
    </div>
  );
}

export default App;
