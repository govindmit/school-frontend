import axios from "axios";
import { api_url } from "../helper/config";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

class PDFService {
  // generate pdf
  generateSimplePDF = async (item: any) => {
    let requested = {
      id: item.itemId,
    };
    await axios({
      method: "POST",
      url: `${api_url}/getItembyid`,
      data: requested,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        // setItem(res?.data.data);
        let items = res?.data.data;
        if (res) {
          setTimeout(() => {
            var price = 0;
            for (let d of items) {
              price = price + d.price;
            }
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
            doc.text("INVOICE", 120, 60);
            doc.setFontSize(20);
            doc.text("Family ID : ", 30, 90);
            doc.text(`12`, 100, 90);
            doc.text("Account Number : ", 30, 100);
            doc.text("123", 100, 100);
            doc.text("Invoice No : ", 180, 90);
            doc.text(`${item.invoiceId}`, 240, 90);
            doc.text("Date : ", 180, 100);
            doc.text(`${item.invoiceDate}`, 220, 100);
            const head = [["ITEM", "AMOUNT"]];
            var data: any = [];
            {
              items && items.length > 1
                ? items.map((ticket: any) => {
                    let ticketData = [
                      ticket.name,
                      ticket.price,
                      // called date-fns to format the date on the ticket
                    ];
                    // push each tickcet's info into a row
                    data.push(ticketData);
                  })
                : data.push([
                    items && items[0]?.name,
                    items && "$" + items[0]?.price,
                  ]);
              // push each tickcet's info into a row
            }
            doc.setFontSize(20);
            autoTable(doc, {
              theme: "grid",
              margin: { top: 120, left: 30 },
              tableWidth: 250,
              styles: { fontSize: 15 },
              columnStyles: { 0: { halign: "left" } },
              headStyles: {
                fillColor: [1, 1, 1],
              },
              head: head,
              body: data,
              didDrawCell: (data: any) => {},
            });
            if (items.length > 2) {
              doc.setFontSize(20);
              doc.text("Grand Total : ", 200, 170);
              doc.setFontSize(15);
              doc.text("$" + `${price}`, 260, 170);
            } else {
              doc.setFontSize(20);
              doc.text("Grand Total : ", 190, 170);
              doc.setFontSize(15);

              doc.text("$" + `${price}`, 260, 170);
            }
            doc.save("Document.pdf");
          }, 2000);
        }
      })
      .catch((err) => {});
  };
}
export default new PDFService();
