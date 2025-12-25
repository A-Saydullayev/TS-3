import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from './components/Layout';
import Detail from "./pages/Detail";

const App = () => {
  return (
    <Routes>
     <Route path="/" element={<Layout/>}>
     <Route path="/" element={<HomePage />} />
     <Route path="/detail/:id" element={<Detail />} />
     </Route>
    </Routes>
  );
};

export default App;
