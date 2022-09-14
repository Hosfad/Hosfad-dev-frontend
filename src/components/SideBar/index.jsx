import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { CgWebsite } from 'react-icons/cg';
import { FaBars, FaFire, FaMoon, FaPoo, FaSun } from 'react-icons/fa';
import { SiDiscord } from 'react-icons/si';
import { DiHeroku } from 'react-icons/di';

import useDarkMode from '../../hooks/useDarkMode';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import e from 'cors';

const SideBar = () => {
  const vis = getWindowDimensions().width > 500 ? true : false ;
  const navigate = useNavigate();
  const [open, setOpen] = useState(vis)

  useEffect(() => {
    function handleResize() {
      if(window.innerWidth > 500){
        setOpen(true)
      }else{
        setOpen(false)
      }
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
    
}

    window.addEventListener('resize', handleResize)
    return ()=>{
      window.removeEventListener("resize" ,handleResize)
    }
  })
  if (open){
    return (

      <div className={`fixed overflow-hidden top-0 left-0 h-screen flex flex-col z-10
                    bg-white dark:bg-gray-900 shadow-lg w-16 ${!open && "hidden"}`} >
                      
          <SideBarIcon icon={<DiHeroku size="28"/>} toolTip="Home" setOpen={setOpen} link="" />
          <ThemeIcon setOpen={setOpen} className="mt-20"></ThemeIcon>

          <Divider />
          <SideBarIcon icon={<CgWebsite size="22"/>} toolTip="Web development" setOpen={setOpen} link="web-development" />
          <SideBarIcon icon={<SiDiscord size="22"/>} toolTip="Discord bots" setOpen={setOpen} link="discord-bots" />
          <SideBarIcon icon={<FaPoo size="20"/>} toolTip="OSRS bots" setOpen={setOpen} link="osrs-bots" />
          
      </div>
    );
  }else{
    return (<div className='fixed top-0 left-0 bg-transparent w-10 h-auto  z-9'>
      <FaBars className='mx-auto scale-125 mt-3  text-[#0dcdbd]' onClick={()=>{ setOpen(!open)}}></FaBars>
      </div>)
  }

 
};
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const SideBarIcon = ({ icon, toolTip  ,setOpen ,link}) => (
  <ConditionalLink to={"/" + link}  condition={link!=null} >
  <div className="sidebar-icon group"onClick={()=>{ getWindowDimensions().width <500 &&  setOpen(false)}}  >
    {icon}

    {
      toolTip != null ? <span class="sidebar-tooltip group hover:scale-100">
          {toolTip}
      </span> : <></>
    }
    
  </div>
  </ConditionalLink>

);


const ThemeIcon = (setOpen) => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  return (
    

    <span onClick={()=>{handleMode() }
    } className="sidebar-icon group ">
      {darkTheme ? (
      <SideBarIcon icon={<FaSun size='22'/>} />
      ) : (
        <SideBarIcon icon={<FaMoon size='22'/>} />
        )}
    </span>


  );
};

const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
      ? <Link to={to}>{children}</Link>
      : <>{children}</>;

const Divider = () => <hr className="sidebar-hr my-3" />;

export default SideBar;
