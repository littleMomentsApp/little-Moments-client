import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import EditListPage from "./pages/EditListPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ListDetailsPage from "./pages/ListDetailsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayProducts from "./pages/DisplayProducts";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/lists" element={<ListPage />} />
        <Route path="/products" element={<DisplayProducts />} />
        <Route path="/lists/:listId" element={<ListDetailsPage />} />
        <Route path="/lists/edit/:listId" element={<EditListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
