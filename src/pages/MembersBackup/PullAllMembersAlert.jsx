import axios from "axios";
import Swal from "sweetalert2";
import Alert from "sweetalert2";
import failAlert from "../../components/Alerts/FailAlert";
import successAlert from "../../components/Alerts/SuccessAlert";

const PullAllMembersAlert = async (guilds, user) => {
  const options = {};
  guilds.map((guild) => {
    options[guild.id] = guild.name;
  });
  const { value } = await Swal.fire({
    title: "Select a server",
    input: "select",
    confirmButtonColor: "#1a8996",
    background: "#292929",
    inputOptions: options,

    inputPlaceholder: "Select a server",
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        axios
          .post(process.env.REACT_APP_API_DOMAIN+`/member/pull/all`, {
            data: {
              hostId: user.user.id,
              destinationGuildId: value,
              access_token: user.discordData.access_token,
            },
          })
          .then((res) => {
            successAlert({
              title: "Successfully pulled all available members",
            });
          }).catch((err) => {
            console.log(err);
            failAlert({
              title: "Something went wrong",
              content: "There was an error , please try again",
            });
          });
      });
    },
  });
};
export default PullAllMembersAlert;
