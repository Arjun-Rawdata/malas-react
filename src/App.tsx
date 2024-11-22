import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Filters from "./pages/Filters";
import Chances from "./pages/Chances";
import Desk from "./pages/Desk";
import Measures from "./pages/Measures";
import Preview from "./pages/Preview";
import Print from "./pages/Print";
import Scanner from "./pages/Scanner";
import Tips from "./pages/Tips";

function App() {
  return (
    <div className="w-full h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/chances" element={<Chances />} />
          <Route path="/desk" element={<Desk />} />
          <Route path="/measures" element={<Measures />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/print" element={<Print />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/tips" element={<Tips />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
