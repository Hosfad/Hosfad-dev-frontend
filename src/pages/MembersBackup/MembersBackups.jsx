import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingPage from "../../components/LoadingPage";
import PullAllMembersAlert from "./PullAllMembersAlert";
import PullMemberAlert from "./PullMemberAlert";
import selectionAlert from "./PullMemberAlert";

function MembersBackups(props) {
  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_DOMAIN+"/user/userInfo", {
        params: {
          discordId: props.user.user.id,
          access_token: props.user.discordData.access_token,
        },
      })
      .then((res) => {
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
    <>
    <div className="w-[70%] overflow-x-auto mx-auto ">
      <h1 className="text-center text-3xl text-white m-8">All backedup members</h1>
      <div className="flex m-6 items-center justify-center">
      <button className="h-8 w-40 rounded-2xl" onClick={()=>{
            PullAllMembersAlert(
              data.guilds,
              props.user,
            );
      }}>Pull all members</button>
      </div>
    <table class="w-full relative mx-auto h-fit text-sm text-left text-white dark:text-gray-400">
        <thead class="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">
              Discord user
            </th>
            <th scope="col" class="py-3 px-6">
              Discord id
            </th>
            <th scope="col" class="py-3 px-6">
              Pull members
            </th>
          </tr>
        </thead>
        <tbody>
          {data.members.map((member) => {
            const discordUser = member.discordUser;
            return (
              <>
                <tr class="primaryl-color border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap text-white"
                  >
                    <div className="grid grid-cols-2">
                      <img
                        className=" rounded-3xl scale-50"
                        src={
                          "https://cdn.discordapp.com/avatars/" +
                          discordUser.id +
                          "/" +
                          discordUser.avatar
                        }
                      ></img>
                      <h1 className=" px-6 my-auto text-white">
                        {discordUser.username}
                      </h1>
                    </div>
                  </th>
                  <td class="py-4 px-6">{discordUser.id}</td>
                  <td class="py-4 ">
                    <button
                      className="h-8 mx-auto w-[85%] rounded-2xl"
                      onClick={() => {
                        PullMemberAlert(
                          props.user.guilds,
                          props.user,
                          member.id
                        );
                      }}
                    >
                      Pull member
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
      
    </>
  );
}

export default MembersBackups;
