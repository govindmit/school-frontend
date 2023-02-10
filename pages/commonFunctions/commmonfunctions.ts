import axios from "axios";
import jwt_decode from "jwt-decode";
import { api_url, auth_token } from "../api/hello";

class CommonFunctions {
  //get token and verify login
  VerifyLoginUser = async () => {
    let login_token: any;
    login_token = localStorage.getItem("QIS_loginToken");
    const decoded: any = jwt_decode(login_token);
    const expiryDate = new Date(decoded.exp * 1000);
    return expiryDate;
  };

  //Crenditials
  GivenPermition = async () => {
    let login_token: any;
    login_token = localStorage.getItem("QIS_loginToken");
    const decoded: any = jwt_decode(login_token);
    let response = await axios.get(`${api_url}/getuserdetails/${decoded.id}`, {
      headers: {
        Authorization: auth_token,
      },
    });
    return response.data.data[0];
  };

  //get lastInsert id

  GetLastInsertId = async () => {
    let response = await axios.get(`${api_url}/getLastInsertId`, {
      headers: {
        Authorization: auth_token,
      },
    });
    return response.data.data[0];
  };
}

export default new CommonFunctions();
