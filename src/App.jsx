import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/SideBar/index"
import useDarkMode from "./hooks/useDarkMode";
import DiscordBots from "./pages/DiscordBots";
function App() {
  useDarkMode(true);

  return (
      <>
        <div className="flex overflow-hidden ">
          <Sidebar></Sidebar>
          <Routes location={window.location} key={window.location.pathname}>
          <Route path="/" element={<Home></Home>}/>
          <Route path="/discord-bots" element={<DiscordBots></DiscordBots>}/>
          </Routes>
        </div>
      </>
    
  );
}



export default App;
