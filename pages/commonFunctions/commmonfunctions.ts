import axios from "axios";
import jwt_decode from "jwt-decode";
import { api_url, auth_token } from "../api/hello";

class CommonFunctions {
  VerifyLoginUser = async () => {
    let login_token: any;
    login_token = localStorage.getItem("QIS_loginToken");
    const decoded: any = jwt_decode(login_token);
    return decoded;
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

  //------------------------         manage previlegs    -------------------------------//
  //manage dashboard
  ManageDashboard = async () => {
    let login_token: any;
    login_token = localStorage.getItem("QIS_loginToken");
    const decoded: any = jwt_decode(login_token);
    let response = await axios.get(`${api_url}/getuserdetails/${decoded.id}`, {
      headers: {
        Authorization: auth_token,
      },
    });
    const dt = response.data.data[0].userPrevilegs;
    const dttt = JSON.parse(dt);
    const lgh = dttt.user_permition.length;
    for (var i = 0; i <= lgh - 1; i++) {
      if (dttt.user_permition[i].Dashboard) {
        return dttt.user_permition[i].Dashboard;
      }
    }
  };

  //manage customers
  ManageCustomers = async () => {
    let login_token: any;
    login_token = localStorage.getItem("QIS_loginToken");
    const decoded: any = jwt_decode(login_token);
    let response = await axios.get(`${api_url}/getuserdetails/${decoded.id}`, {
      headers: {
        Authorization: auth_token,
      },
    });
    const dt = response.data.data[0].userPrevilegs;
    const dttt = JSON.parse(dt);
    const lgh = dttt.user_permition.length;
    for (var i = 0; i <= lgh - 1; i++) {
      if (dttt.user_permition[i].Customers) {
        return dttt.user_permition[i].Customers;
      }
    }
  };

  //manage invoices
  ManageInvoices = async () => {
    let login_token: any;
    login_token = localStorage.getItem("QIS_loginToken");
    const decoded: any = jwt_decode(login_token);
    let response = await axios.get(`${api_url}/getuserdetails/${decoded.id}`, {
      headers: {
        Authorization: auth_token,
      },
    });
    const dt = response.data.data[0].userPrevilegs;
    const dttt = JSON.parse(dt);
    const lgh = dttt.user_permition.length;
    for (var i = 0; i <= lgh - 1; i++) {
      if (dttt.user_permition[i].Invoices) {
        return dttt.user_permition[i].Invoices;
      }
    }
  };

  //manage Activites
  ManageActivity = async () => {
    let login_token: any;
    login_token = localStorage.getItem("QIS_loginToken");
    const decoded: any = jwt_decode(login_token);
    let response = await axios.get(`${api_url}/getuserdetails/${decoded.id}`, {
      headers: {
        Authorization: auth_token,
      },
    });
    const dt = response.data.data[0].userPrevilegs;
    const dttt = JSON.parse(dt);
    const lgh = dttt.user_permition.length;
    for (var i = 0; i <= lgh - 1; i++) {
      if (dttt.user_permition[i].Customers) {
        return dttt.user_permition[i].Customers;
      }
    }
  };

  //manage Sales invoices
  ManageSalesInvoices = async () => {
    let login_token: any;
    login_token = localStorage.getItem("QIS_loginToken");
    const decoded: any = jwt_decode(login_token);
    let response = await axios.get(`${api_url}/getuserdetails/${decoded.id}`, {
      headers: {
        Authorization: auth_token,
      },
    });
    const dt = response.data.data[0].userPrevilegs;
    const dttt = JSON.parse(dt);
    const lgh = dttt.user_permition.length;
    for (var i = 0; i <= lgh - 1; i++) {
      if (dttt.user_permition[i].Customers) {
        return dttt.user_permition[i].Customers;
      }
    }
  };

  //manage composers
  ManageComposers = async () => {
    let login_token: any;
    login_token = localStorage.getItem("QIS_loginToken");
    const decoded: any = jwt_decode(login_token);
    let response = await axios.get(`${api_url}/getuserdetails/${decoded.id}`, {
      headers: {
        Authorization: auth_token,
      },
    });
    const dt = response.data.data[0].userPrevilegs;
    const dttt = JSON.parse(dt);
    const lgh = dttt.user_permition.length;
    for (var i = 0; i <= lgh - 1; i++) {
      if (dttt.user_permition[i].Customers) {
        return dttt.user_permition[i].Customers;
      }
    }
  };

  //Crenditials
  GetuserDet = async (token: any) => {
    const decoded: any = jwt_decode(token);
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
