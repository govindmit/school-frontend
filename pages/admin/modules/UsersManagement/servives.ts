import axios from "axios";
import { api_url, auth_token } from "../../api/hello";

class UserService {
  //get user det
  GetUserDet = async (id: any) => {
    let response = await axios.get(`${api_url}/getuserdetails/${id}`, {
      headers: {
        Authorization: auth_token,
      },
    });
    return response.data.data[0];
  };

  //get role det
  GetRoles = async () => {
    let response = await axios.get(`${api_url}/getRole`, {
      headers: {
        Authorization: auth_token,
      },
    });
    return response.data.data;
  };
}

export default new UserService();
