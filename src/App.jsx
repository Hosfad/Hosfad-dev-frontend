import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/SideBar/index"
import useDarkMode from "./hooks/useDarkMode";
import DiscordBots from "./pages/DiscordBots";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { useEffect } from "react";

const exportAsImage = async (el, imageFileName) => {

  const canvas = await html2canvas(el);
  const image = canvas.toDataURL("image/png", 1.0);
  downloadImage(image ,imageFileName)
  };

  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;
    
    fakeLink.href = blob;
    
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    
    fakeLink.remove();
    };

function App() {
  useDarkMode(true);
const ref = useRef();
  useEffect(()=>{
  })
  return (
      <>
        <div className="flex overflow-hidden " ref={ref}>
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
