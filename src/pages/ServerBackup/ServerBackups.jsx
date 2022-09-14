import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import ReactTooltip from "react-tooltip";
import Swal from "sweetalert2";
import failAlert from "../../components/Alerts/FailAlert";
import LoadingAlert from "../../components/Alerts/LoadingAlert";
import successAlert from "../../components/Alerts/SuccessAlert";
import LoadingPage from "../../components/LoadingPage";
import LoadBackupAlert from "./LoadBackupAlert";

function ServerBackupSettings(props) {
  const [backupsData, setbackupsData] = useState({
    guild: { name: "asd" },
    backups: [],
  });
  const [loaded, setLoaded] = useState(false);
  const [params, setParams] = useSearchParams();
  const guildId = params.get("guildId");
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_DOMAIN+"/serverBackups/backups/all", {
        params: {
          guildId: guildId,
        },
      })
      .then((res) => {
        setTimeout(() => {
          setbackupsData(res.data);
          setLoaded(true);
        }, 1000);
      });
  }, [setbackupsData]);

  return loaded ? (
    <>
      <ReactTooltip place="top" type="info"></ReactTooltip>

      <div className="grid grid-cols-3 p-12 mx-auto h-[80%] gap-y-8  w-[80%] overflow-x-auto">
        <h1 className="text-2xl col-span-3 text-white w-full text-center">
          Server Backups
        </h1>

        <div className="flex col-span-3 justify-center items-centers">
          <button
            className="w-[30%] rounded-2xl h-8 mx-auto"
            onClick={async () => {
              LoadingAlert({
                title: "Backup started, This may take a moment.",
                content: "This may take a moment",
              });
              await axios
                .post(process.env.REACT_APP_API_DOMAIN+`/serverBackups/guilds/backup`, {
                  data: {
                    guildId: guildId,
                    hostId : props.user.user.id ,
                    access_token : props.user.discordData.access_token
                  },
                })
                .then((res) => {
                  Swal.close();
                  successAlert({
                    title: "Server backed up!",
                  });
                  setbackupsData({
                    ...backupsData,
                    backups: [...backupsData.backups, res.data.backup],
                  });
                })
                .catch(() => {
                  failAlert({
                    title: "Something went wrong",
                    content: "Could not backup the server , please try again",
                  });
                });
            }}
          >
            Backup now
          </button>
        </div>

        <h1 className="text-2xl mt-6 col-span-3 text-white w-full text-center">
          All backups for server : {backupsData.guild.name}
        </h1>
        <div className=" col-span-3  ">
          <table class="w-full  relative text-sm text-left text-white dark:text-gray-400">
            <thead class="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  Server
                </th>
                <th scope="col" class="py-3 px-6">
                  Date
                </th>
                <th scope="col" class="py-3 px-6">
                  Backup id
                </th>
                <th scope="col" class="py-3 px-6">
                  info
                </th>
                <th scope="col" class="py-3 px-6">
                  Delete
                </th>
                <th scope="col" class="py-3 px-6">
                  Clone backup
                </th>
              </tr>
            </thead>
            <tbody>
              {backupsData.backups.map((backup) => {
                console.log(backup.backup.createdTimestamp);
                let date =
                  backup.backup.createdTimestamp + 300000 >=
                  new Date().getTime()
                    ? "Just now" 
                    :new Date(
                      backup.backup.createdTimestamp
                    ).toLocaleDateString("en-US");

                return (
                  <tr class="primaryl-color border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap text-white"
                    >
                      <div className="grid mt-4  grid-cols-5">
                        <img
                          className=" rounded-3xl w-8"
                          src={backup.backup.iconURL}
                        ></img>
                        <h1 className="col-span-4 mt-1 text-white">
                          {backup.backup.name}
                        </h1>
                      </div>
                    </th>
                    <td class="py-4 px-6">{date}</td>

                    <td class="py-4 px-6">{backup.id}</td>
                    <td class="py-4 px-6">
                      <button
                        className=" h-7 w-20"
                        onClick={() => {
                          window.open(
                            process.env.REACT_APP_API_DOMAIN+"/serverBackups/backups/" +
                              backup.id
                          );
                        }}
                      >
                        Raw data
                      </button>
                    </td>
                    <td class="py-4 px-6">
                      <button
                        className="bg-red-700 h-7 w-20"
                        onClick={() => {
                          Swal.fire({
                            title: `<h5 style='color:white'>Are you sure you want to delete this backup</h5>`,
                            icon: "warning",
                            confirmButtonText: "Delete",
                            confirmButtonColor: "red",
                            showCancelButton: true,
                            cancelButtonText: "cancel",
                            background: "#292929",
                            text: "Once a backup is deleted you cannot recover it",
                          }).then(async (value) => {
                            if (value.isConfirmed) {
                              await axios
                                .delete(
                                  process.env.REACT_APP_API_DOMAIN+"/serverBackups/backups/" +
                                    backup.id,
                                  { data: { hostId: "asd" } }
                                )
                                .then((res) => {
                                  setbackupsData({
                                    ...backupsData,
                                    backups: backupsData.backups.filter(
                                      (item) => item.id !== backup.id
                                    ),
                                  });
                                  successAlert({
                                    title: "Succesfully deleted backup",
                                    content: `${backup.id} has been deleted.`,
                                  });
                                })
                                .catch(() => {
                                  failAlert({
                                    title: "Something went wrong",
                                    content:
                                      "Could not delete backup , please try again.",
                                  });
                                });
                            }
                          });
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td class="py-4 px-6">
                      <button
                        className="bg-green-700 h-7 w-24"
                        onClick={() => {
                          LoadBackupAlert(
                            props.user.guilds,
                           backup.id,
                           props.user
                          );
                        }}
                      >
                        Load backup
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  ) : (
    <LoadingPage></LoadingPage>
  );
}

export default ServerBackupSettings;
