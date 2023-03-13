import jwt_decode from "jwt-decode";
import axios from "axios";
import { api_url, auth_token } from "../helper/config";

class UserService {
  //check security
  // CheckSecurity = () => {
  //   let login_token: any;
  //   login_token = localStorage.getItem("QIS_loginToken");
  //   const decoded: any = jwt_decode(login_token);
  //   if (decoded.exp * 1000 < Date.now()) {
  //     localStorage.removeItem("QIS_loginToken");
  //     localStorage.removeItem("QIS_User");
  //     router.push("/");
  //   }
  // };

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
