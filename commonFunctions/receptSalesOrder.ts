import axios from "axios";
import { api_url, auth_token } from "../helper/config";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

class ReceiptSalesPDFService {
  // generate pdf
  ReceiptPDF = async (item: any, receipt_title: string) => {
    console.log(item);
    await axios({
      method: "get",
      url: `${api_url}/getActivityDetails/${item.activityId}`,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((res) => {
        let items = res?.data.data[0];
        if (res) {
          const doc = new jsPDF("l", "mm", "a4");
          doc.setFontSize(25);
          doc.text("Qatar International School", 30, 21);
          doc.setFontSize(12);
          doc.text("Qatar International School", 31, 27);
          doc.setFontSize(12);
          doc.text("United Nations St, West Bay, P.O. Box: 5697", 31, 32.5);
          doc.text("Doha, Qatar", 31, 37.5);
          doc.setFontSize(12);
          doc.text("Telephone: 44833456", 235, 20);
          doc.text("Website: www.qis.org", 236, 26);
          doc.text("Email:  qisfinance@qis.org", 236, 32);
          doc.setFont("courier");
          doc.setFontSize(30);
          doc.text(`${receipt_title}`, 120, 60);
          doc.setFontSize(15);
          doc.text("Recept Number   : ", 30, 90);
          doc.text(` RTC00000000123`, 85, 90);
          doc.text("Tranaction Type : ", 30, 100);
          doc.text(" Amex", 85, 100);
          doc.text("Sales Invoice Number  : ", 160, 90);
          doc.text(`INV-000${item.id}`, 235, 90);
          doc.text("Tranaction Date : ", 180, 100);
          doc.text(`01/01/2023`, 235, 100);
          doc.setFontSize(15);
          doc.text("Tranaction Amount : ", 180, 110);
          doc.text("$" + `${items.price}`, 242, 110);
          const head = [["SL.No", "ACTIVITY NAME", "AMOUNT(QAR)"]];
          doc.setFontSize(20);
          autoTable(doc, {
            theme: "grid",
            margin: { top: 120, left: 30 },
            tableWidth: 250,
            styles: { fontSize: 15 },
            columnStyles: { 0: { halign: "left" } },
            head: head,
            body: [["1", `${items.name}`, `${items.price}`]],
            didDrawCell: (data: any) => {},
          });
          if (items.length > 2) {
            doc.setFontSize(20);
            doc.text("Grand Total : ", 200, 170);
            doc.setFontSize(15);
            doc.text("$" + `${items.price}`, 255, 170);
          } else {
            doc.setFontSize(20);
            doc.text("Grand Total : ", 200, 170);
            doc.setFontSize(15);
            doc.text("$" + `${items.price}`, 255, 170);
          }
          doc.save("Document.pdf");
        }
      })
      .catch((err) => {});
  };
}
export default new ReceiptSalesPDFService();
