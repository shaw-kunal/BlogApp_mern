import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { Context } from "./context/Context";




function App() {
  const {user} = useContext(Context);
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={user ?<Home/>: <Login/>}/>
      <Route path="/write" element={<Write/>}/>
      <Route path="/post/:postId" element={<Single/>}/>
      <Route path="/setting" element={<Setting/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
