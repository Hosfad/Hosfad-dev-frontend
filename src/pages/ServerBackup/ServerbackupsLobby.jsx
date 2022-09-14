import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import LoadingPage from "../../components/LoadingPage";

function ServerBackupLobby(props) {
  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_DOMAIN+"/user/userInfo", {
        params: {
          discordId: props.user.user.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!loaded) {
    return <LoadingPage></LoadingPage>;
  }


  return (
    loaded && (
      <>

        <div className="grid grid-rows-8 w-[80%]">
        <h1 className="text-white text-center text-3xl mt-8">Server list</h1>
        <h1 className="text-white text-center text-1xl">Your server is not showing up ? 
        <Link to={{ pathname: process.env.REACT_APP_DISCORD_BOT_INVITE_URL }}  target="_blank" className="underline" >Invite me</Link></h1>
        <div className="grid sm:grid-cols-3 grid-cols-1 row-span-6 p-8 mt-12 mx-auto gap-8 w-full">
          {data.guilds.map((guild) => {
            return (
              <Card
                title={guild.name}
                img={guild.icon}
                guildId={guild.id}
                link={"/serverBackupsSettings/"}
              ></Card>);
          })}
        </div>
      </div>
      </>
    )
  );
}

export default ServerBackupLobby;
