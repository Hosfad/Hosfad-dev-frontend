import axios from "axios";
import Swal from "sweetalert2";
import Alert from "sweetalert2";
import failAlert from "../../components/Alerts/FailAlert";
import successAlert from "../../components/Alerts/SuccessAlert";

const PullMemberAlert = async (guilds,user ,memberId ) => {
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
        Swal.showLoading();
        axios
          .post(process.env.REACT_APP_API_DOMAIN+`/member/pull/${value}/${memberId}`, {
            data: {
              hostId: user.user.id,
              access_token: user.discordData.access_token,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              successAlert({ title: "Successfully pulled member" });
            }
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
export default PullMemberAlert;
