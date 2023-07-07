import "./App.css";
import { Route, Routes } from "react-router-dom";
import landing from "./Views/Landing/Landing";
import home from "./Views/Home/Home";

function App() {
  const Home = home;
  const Landing = landing;


  return (

    <div className="App">

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/home" element={<Home />} />

      </Routes>

    </div>
  );
}

export default App;
