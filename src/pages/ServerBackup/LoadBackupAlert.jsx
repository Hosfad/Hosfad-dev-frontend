import axios from "axios";
import Swal from "sweetalert2";
import Alert from "sweetalert2";
import failAlert from "../../components/Alerts/FailAlert";
import LoadingAlert from "../../components/Alerts/LoadingAlert";
import successAlert from "../../components/Alerts/SuccessAlert";

const LoadBackupAlert = async (guilds, backupId , user) => {
  const options = {};
  guilds.map((guild) => {
    options[guild.id] = guild.name;
  });
  const { value } = await Swal.fire({
    title: "Select a server you want to load the backup into",
    input: "select",
    confirmButtonColor: "#1a8996",
    background: "#292929",
    inputOptions: options,

    inputPlaceholder: "Select a server",
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        LoadingAlert({
          title: "Loading backup ,This may take a moment",
          content: "This may take a moment",
        });
        console.log(value);
        axios
          .post(process.env.REACT_APP_API_DOMAIN+`/serverBackups/guilds/load`, {
            data: {
              guildId: value,
              hostId: user.user.id,
              backupId: backupId,
              access_token: user.discordData.access_token,
            },
          })
          .then((res) => {
            successAlert({ title: "Successfully pulled member" });
          })
          .catch((err) => {
            failAlert({
              title: "Something went wrong",
              content: "There was an error , please try again",
            });
          });
      });
    },
  });
};
export default LoadBackupAlert;
