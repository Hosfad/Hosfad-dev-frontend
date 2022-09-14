import axios from "axios";
import e from "cors";
import React, { useEffect, useState } from "react";
import failRequest from "../../components/Alerts/FailAlert";
import { useSearchParams } from "react-router-dom";
import successAlert from "../../components/Alerts/SuccessAlert";
import { FaAccessibleIcon } from "react-icons/fa";
import pullMemberAlert from "./PullMemberAlert";
import failAlert from "../../components/Alerts/FailAlert";
import allMembersAlert from "./PullAllMembersAlert";
import warningAlert from "../../components/Alerts/WarningAlert";
import ReactTooltip from "react-tooltip";
import PullAllMembersAlert from "./PullAllMembersAlert";
import LoadingPage from "../../components/LoadingPage";

function MemberBackupSettings(props) {
  const [memberBackupSettings, setmemberBackupSettings] = useState();
  const [loaded, setLoaded] = useState(false);
  const [params, setParams] = useSearchParams();
  const [selectedSettings, setSettings] = useState();
  const guildId = params.get("guildId");
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_DOMAIN+"/user/membersBackupSettings", {
        params: {
          guildId: guildId,
          access_token: props.user.discordData.access_token,
        },
      })
      .then((res) => {
        setmemberBackupSettings(res.data);
        setLoaded(true);
      });
  }, []);

  if (!loaded) {
    return <LoadingPage></LoadingPage>;
  }


  return (
    loaded && (
      <>
        <ReactTooltip place="top" type="info"></ReactTooltip>

        <div className="grid grid-cols-3 p-12 mx-auto h-[80%] gap-y-8  w-[70%]">
          <h1 className="text-2xl col-span-3 text-white w-full text-center">
            Member backup settings
          </h1>

          <h1 className="text-center text-white text-2xl">
            Verification role (*)
          </h1>
          <div className="col-span-2">
            <select
              data-tip="The role that will be given to members when they verify thier account."
              id="countries"
              class="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 
              focus:border-blue-500 block w-full p-2.5 
               dark:border-gray-600  dark:text-white
                dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={
                memberBackupSettings.guild.authRoleId
                  ? memberBackupSettings.guild.authRoleId
                  : memberBackupSettings.roles[0]
              }
              onChange={(e) => {
                setSettings({ ...selectedSettings, role: e.target.value });
              }}
            >
              {memberBackupSettings.roles.map((role) => {
                return (
                  <option value={role.id} key={role.id}>
                    {role.name}
                  </option>
                );
              })}
            </select>
          </div>

          <h1 className="text-center text-white text-2xl">Verification channel</h1>
          <div className="col-span-1">
            <select
              data-tip="Channel to send a welcome message when a new user verifies their account."
              id="countries"
              class="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 
              focus:border-blue-500 block w-full p-2.5 
               dark:border-gray-600  dark:text-white
                dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={
                memberBackupSettings.guild.welcomeChannelId
                  ? memberBackupSettings.guild.welcomeChannelId
                  : memberBackupSettings.welcomeChannels[0]
              }
              onChange={(e) => {
                setSettings({
                  ...selectedSettings,
                  welcomeChannel: e.target.value,
                });
              }}
            >
              <option value="none" key={"none"}>
                None
              </option>
              {memberBackupSettings.welcomeChannels.map((channel) => {
                return (
                  <option value={channel.id} key={channel.id}>
                    {channel.name}
                  </option>
                );
              })}
            </select>
          </div>

           <div className="flex  items-center justify-center">
      <button className="h-8 w-56 rounded-2xl" data-tip="Send verification embed to the verification channel">Send verification message</button>
      </div>
          <h1 className="text-center text-white text-2xl">Logs channel</h1>
          <div className="col-span-2">
            <select
              data-tip="Channel to send private logs (Meant for owners eyes only)."
              id="countries"
              class="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 
              focus:border-blue-500 block w-full p-2.5 
               dark:border-gray-600  dark:text-white
                dark:focus:ring-blue-500 dark:focus:border-blue-500"
              isMulti
              defaultValue={
                memberBackupSettings.guild.logsChannelId
                  ? memberBackupSettings.guild.logsChannelId
                  : memberBackupSettings.logChannels[0]
              }
              onChange={(e) => {
                setSettings({
                  ...selectedSettings,
                  logChannel: e.target.value,
                });
              }}
            >
              <option value="none" key={"none1"}>
                None
              </option>
              {memberBackupSettings.logChannels.map((channel) => {
                return (
                  <option value={channel.id} key={channel.id}>
                    {channel.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex col-span-3 justify-center items-centers">
            <button
              className="w-[35%] rounded-2xl h-8 mx-auto"
              onClick={() => {
                if (!selectedSettings) {
                  warningAlert({
                    title: "You havent changed any settings",
                  });
                  return;
                }
                axios
                  .post(process.env.REACT_APP_API_DOMAIN+"/user/saveGuildSettings", {
                    data: {
                      guildId: guildId,
                      data: selectedSettings,
                      access_token: props.user.discordData.access_token,
                    },
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      successAlert({ title: "Saved settings." });
                    } else {
                      failRequest({
                        title: "Something went wrong",
                        content:
                          "Coudn't save settings in the database , please try again",
                      });
                    }
                  });
              }}
            >
              Save settings
            </button>
          </div>
          <div className="flex col-span-3 justify-center items-centers">
            <button
              className="w-[35%] rounded-2xl h-8 mx-auto"
              onClick={() => {
                PullAllMembersAlert(
                  props.user.guilds,
                  props.user,
                );
              }}
            >
              Pull all members
            </button>
          </div>
          <h1 className="text-2xl mt-6 col-span-3 text-white w-full text-center">
            Backed up members
          </h1>
          <div className=" col-span-3 ">
            <table class="w-full text-sm text-left text-white dark:text-gray-400">
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
                {memberBackupSettings.members.map((member) => {
                  const discordUser = member.discordUser;
                  return (
                    <>
                      <tr class="primaryl-color border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap text-white"
                        >
                          <div className="grid grid-cols-5">
                            <img
                              className=" rounded-3xl w-8"
                              src={
                                "https://cdn.discordapp.com/avatars/" +
                                discordUser.id +
                                "/" +
                                discordUser.avatar
                              }
                            ></img>
                            <h1 className="col-span-4 mt-1 text-white">
                              {discordUser.username}
                            </h1>
                          </div>
                        </th>
                        <td class="py-4 px-6">{discordUser.id}</td>
                        <td class="py-4 px-6 ">
                          <button
                            className="h-8 mx-auto w-[100%] rounded-2xl"
                            onClick={() => {
                              pullMemberAlert(
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
        </div>
      </>
    )
  );
}

export default MemberBackupSettings;
