import axios from "axios";
import { api_url } from "../pages/api/hello";
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
            doc.setFontSize(20);
            doc.text("Qatar International School", 40, 20);
            doc.setFontSize(10);
            doc.text("Qatar International School", 40, 25);
            doc.setFontSize(10);
            doc.text("United Nations St, West Bay, P.O. Box: 5697", 40, 30);
            doc.text("Doha, Qatar", 40, 35);
            doc.text("Telephone: 44833456", 240, 20);
            doc.text("Website:  www.qis.org", 240, 28);
            doc.text("Email:  qisfinance@qis.org", 237, 35);
            doc.setFont("courier");
            doc.setFontSize(40);
            doc.text("INVOICE", 120, 60);
            doc.setFontSize(20);
            doc.text("family ID", 30, 90);
            doc.text(`12`, 100, 90);
            doc.text("Account Number", 30, 100);
            doc.text("123", 100, 100);
            doc.text("Invoice No", 200, 90);
            doc.text(`${item.invoiceId}`, 250, 90);
            doc.text("Date", 200, 100);
            doc.text(`${item.invoiceDate}`, 250, 100);
            const head = [["ITEM", "AMOUNT"]];
            var data: any = [];
            // push each tickcet's info into a row
            // items.map((it: any) => data.push(Object.values(it)));
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
                    items && items[0]?.price,
                  ]);
              // push each tickcet's info into a row
            }
            doc.setFontSize(20);
            autoTable(doc, {
              theme: "plain",
              margin: { top: 120, left: 50 },
              tableWidth: 500,
              styles: { fontSize: 15 },
              columnStyles: { 0: { halign: "left" } },
              head: head,
              body: data,
              didDrawCell: (data: any) => {},
            });
            if (items.length > 2) {
              doc.setFontSize(20);
              doc.text("Grand Total", 195, 163);
              doc.setFontSize(15);
              doc.text(`${price}`, 258, 163);
            } else {
              doc.setFontSize(20);
              doc.text("Grand Total", 190, 155);
              doc.setFontSize(15);

              doc.text(`${price}`, 240, 155);
            }
            doc.save("Document.pdf");
          }, 2000);
        }
      })
      .catch((err) => {});
  };
}
export default new PDFService();
