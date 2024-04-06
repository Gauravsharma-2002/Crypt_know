import {BrowserRouter as Router,Routes,Route}from "react-router-dom";
import Header from "./component/Header"
import Home from "./component/Home";

import CoinsDetail from "./component/CoinsDetail";
import Exchanges from "./component/Exchanges";
import Coin from "./component/Coin";
import Footer from "./component/Footer";



function App() {
  return (
   <Router>
    <Header/>
    <Routes>
      <Route path={"/"} element={<Home/>}/>
      <Route path={"/coins"} element={<Coin/>}/>
      <Route path={"/exchanges"} element ={<Exchanges/>}/>
      <Route path={"/coins/:id"} element={<CoinsDetail/>}/>
    </Routes>
    <Footer/>
   </Router>
  );
}

export default App;
