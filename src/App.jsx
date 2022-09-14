import axios from "axios";
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/SideBar/index"
import useDarkMode from "./hooks/useDarkMode";
function App() {

  useDarkMode(true)


  
  return (
      <>
        <div className="flex overflow-hidden ">
          <Sidebar></Sidebar>
          <Routes location={window.location} key={window.location.pathname}>
          <Route path="/" element={<Home></Home>}/>
          </Routes>
        </div>
      </>
    
  );
}



export default App;
