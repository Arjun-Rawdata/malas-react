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
import { useEffect } from "react";
import { CameraKit } from "./utils/CameraKitContext";

function App() {
  useEffect(() => {
    const preventContextMenu = (event: Event) => event.preventDefault();
    const preventTouchStart = (event: Event) => event.preventDefault();

    window.addEventListener("contextmenu", preventContextMenu);
    window.addEventListener("touchstart", preventTouchStart);

    return () => {
      window.removeEventListener("contextmenu", preventContextMenu);
      window.removeEventListener("touchstart", preventTouchStart);
    };
  }, []);

  return (
    <CameraKit>
      <div className="grid place-items-center">
        <div className="w-[1080px] h-[1920px] border border-primary bg-primary-white relative">
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
      </div>
    </CameraKit>
  );
}

export default App;
