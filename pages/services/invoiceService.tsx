import axios from "axios";
import { api_url } from "../api/hello";
class InvoiceService {
  getInvoice() {
    return axios({
      method: "POST",
      url: `${api_url}/getInvoice`,
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  }

  deleteInvoice(id: any) {
    let reqData = {
      userId: "2",
    };
    return axios({
      method: "DELETE",
      url: `${api_url}/deleteInvoice/${id}`,
      data: reqData,
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  }

  sendInvoiceEmail(invoiceId: any) {
    return axios({
      method: "GET",
      url: `${api_url}/sendInvoiceEmail/${invoiceId}`,
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  }
  updateInvoice(id: any) {
    return axios({
      method: "PUT",
      url: `${api_url}/updateInvoice/${id}`,
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  }
  createInvoice(requestedData: any) {
    return axios({
      method: "POST",
      url: `${api_url}/createInvoice`,
      data: requestedData,
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  }
}
export default new InvoiceService();
