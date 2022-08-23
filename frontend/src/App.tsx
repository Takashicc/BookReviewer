import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BookDetail from "./screens/BookDetail";
import Home from "./screens/Home";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/books/:isbn" element={<BookDetail />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
