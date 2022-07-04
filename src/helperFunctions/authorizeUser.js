import { getLocalStorage } from "./localstorage";
import { authorizedUser } from "../actions";
import { server_url } from "../config";
import axios from "axios";
import history from "../utils/history";
const authorizeUser = async () => {
  try {
    const token = getLocalStorage();
    if (!token) {
      history.push("/login");
    }

    const response = await axios.post(
      `${server_url}/users/authorize`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    authorizedUser(response.data.user);
  } catch (err) {
    history.push("/login");
  }
};
// export default authorizeUser;
