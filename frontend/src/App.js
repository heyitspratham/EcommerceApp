import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Ribbon from "./components/Ribbion"
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import loading from "./components/Loader";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4000'
function App() {
  return (
    <BrowserRouter >
        <Ribbon/>
        <Navbar/>
        <Routes>
          <Route exact path="/" Component={Home}  />
          {/* <Route exact path="/sad" Component={loading}  /> */}
        </Routes>

        <Footer/>
    </BrowserRouter>
  );
}

export default App;
