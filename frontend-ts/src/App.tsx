import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainContent from "./pages";



function App() {
  return (
      <div>
        <Header />
          <MainContent />
        <Footer />
      </div>
  );
}

export default App;
