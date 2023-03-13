import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TableHead,
  Button,
  Breadcrumbs,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Pagination,
  IconButton,
  Tabs,
  Tab,
  Menu,
  Grid,
  InputLabel,
  Autocomplete,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiFilterAlt, BiShow } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { api_url, auth_token } from "../../../helper/config";
import MiniDrawer from "../../sidebar";
import DeleteFormDialog from "../modules/CreditNotes/deletedialougebox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Image from "next/image";
import PDFService from '../../../commonFunctions/invoicepdf';
import MainFooter from "../../commoncmp/mainfooter";
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
//pagination function
function usePagination(data: any, itemsPerPage: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);
  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data?.slice(begin, end);
  }
  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }
  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }
  function jump(page: any) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }
  return { next, prev, jump, currentData, currentPage, maxPage };
}

//filter form values
type FormValues = {
  startdate: Date;
  enddate: Date;
  customer: string;
  invoice:string;
  receipt:string;
  payment:string;

};

export default function ReportList() {
  const [reports, setReports] = useState<any>([]);
  const [searchquery, setsearchquery] = useState("");
  const [searchdata, setsearchdata] = useState([]);
  const [All, setAll] = useState(0);
  const [value, setValue] = React.useState("");
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [users, setUsers] = useState<any>([]);
  const [id, setid] = React.useState(0);
  const [val, setVal] = useState<any>({});
  const [receiptNo, setReceiptNo] = useState<any>("");
  const [invoiceNo, setInvoiceNo] = useState<any>("");
  const [paymentType, setPaymentType] = useState<any>("");
  const [sort, setsort] = useState<any>(0);
  const [startdate, setstartdate] = useState<FormValues | any>(null);
  const [enddate, setenddate] = useState<any>("");
  const [inputValue, setInputValue] = React.useState("");
 
  useEffect(() => {
    fetchData();
    getUser();
  }, []);
  //get credit notes
  const url = `${api_url}/getReports`;
  const fetchData = async () => {
      await axios({
        method: "POST",
        url: url,
        headers: {
          Authorization: auth_token,
        },
      }).then((res:any)=>{
        setReports(res.data.data);
        setsearchdata(res.data.data);
        setAll(res.data.data.length);
      }).catch ((error: any) =>{
        console.log("error", error);
      } )
  };
  //get customers(users) list
  const getUser = async () => {
    const url = `${api_url}/getuser`;
    await axios({
      method: "POST",
      url: url,
      headers: {
        Authorization: auth_token,
      },
    }).then((res:any)=>{
      setUsers(res.data.data.filter((dt: any) => dt.roleId !== 1));
    }).catch ((error: any) =>{
      console.log("error", error);
    } )
  };
  const option: { id: number; title: string }[] = [];
  users &&
    users.map((data: any, key: any) => {
      return option.push({
        id: data.id,
        title: data.name,
      });
    });

    const generateSimplePDF = async (item: any) => {
      PDFService.generateSimplePDF(item);
    };

  //searching
  const handleSearch = (e: any) => {
    setsearchquery(e.target.value);
    if (e.target.value === "") {
      setReports(searchdata);
    } else {
      const filterres = searchdata.filter((item: any) => {
        return (
          item?.customer_name?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item?.customer_email?.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      const dtd = filterres;
      setReports(dtd);
    }
  };

  //reset filter value
  function ResetFilterValue() {
    setVal([]);
    setReceiptNo("");
    setInvoiceNo("");
    setPaymentType("");
    setstartdate(null);
    setenddate(null);
    fetchData();
  }
  //filter data
  const filterApply = async (e: any) => {

    e.preventDefault();

    const reqData = {
     customer: val?.title !== "undefined" ? val?.title: "",
      invoiceid:invoiceNo,
      receipt:receiptNo,
      paymentMethod:paymentType,
      startDate:
        startdate !== null ? moment(startdate,"DD MM YYYY").format("YYYY-MM-DD") : startdate,
        endDate:
        enddate !== null ? moment(enddate,"DD MM YYYY").format("YYYY-MM-DD") : enddate,
    };
    console.log('@@@@@@@@@@@',reqData);

    await axios({
      method: "POST",
      url: `${api_url}/getReports`,
      data: reqData,
      headers: {
          Authorization: auth_token,
      },
  })
      .then((res: any) => {
          if (res.status === 200) {
            setReports(res.data.data);
            setsearchdata(res.data.data);
          }
      })
      .catch((error: any) => {
          console.log(error);
      });
  };

  //pagination
  const [row_per_page, set_row_per_page] = useState(5);
  function handlerowchange(e: any) {
    set_row_per_page(e.target.value);
  }
  let [page, setPage] = useState(1);
  const PER_PAGE = row_per_page;
  const count = Math.ceil(reports.length / PER_PAGE);
  const DATA = usePagination(reports, PER_PAGE);

  const handlePageChange = (e: any, p: any) => {
    setPage(p);
    DATA.jump(p);
  };

  //open close delete popup boxes
  const closePoP = (data: any) => {
    setDeleteOpen(false);
    fetchData();
  };
  function openDelete(item: any) {
    setid(item.id);
    setDeleteOpen(true);
  }


  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <div className="guardianBar">
            {/*bread cump */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              style={{ padding: "8px", marginBottom: "15px" }}
            >
              <Stack>
                <Stack spacing={3}>
                  <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link
                      key="1"
                      color="inherit"
                      href="/admin/dashboard"
                      style={{ color: "#1A70C5", textDecoration: "none" }}
                    >
                      Home
                    </Link>
                    <Link
                      key="2"
                      color="inherit"
                      href="/"
                      style={{ color: "#7D86A5", textDecoration: "none" }}
                    >
                     Reports
                    </Link>
                  </Breadcrumbs>
                </Stack>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#333333" }}
                >
                  REPORTS
                </Typography>
              </Stack>
            </Stack>
            {/*bread cump */}
            <Card
              style={{ margin: "10px", padding: "15px" }}
              className="box-shadow"
            >
              <TableContainer>
                {/*bread cump */}
                <Stack
                  style={{ marginBottom: "10px" }}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                  </Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    className="fimport-export-box"
                  >
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <Box>
                          <MenuItem {...bindTrigger(popupState)}>
                            <BiFilterAlt />
                            &nbsp; Filter
                          </MenuItem>
                          <Menu {...bindMenu(popupState)}>
                            <Container>
                              <Grid style={{ width: "1030px" }}>
                                <Typography variant="h5">
                                  <b>Filter</b>
                                </Typography>
                                <form
                                //onSubmit={handleSubmit(onSubmit)}
                                >
                                  <Stack style={{ marginTop: "10px" }}>
                                    <Grid container spacing={2}>
                                      <Grid item xs={12} lg={4}>
                                        <Stack spacing={1}>
                                        <InputLabel htmlFor="receipt">
                                           Receipt No.
                                          </InputLabel>
                                          <FormControl fullWidth>
                                            <OutlinedInput
                                              type="text"
                                              id="receipt"
                                              placeholder="Receipt No..."
                                              fullWidth
                                              size="small"
                                              value={receiptNo}
                                              onChange={(e: any) =>
                                                setReceiptNo(e.target.value)
                                              }
                                            />
                                          </FormControl>
                                        </Stack>
                                      </Grid>
                                      <Grid item xs={12} lg={4}>
                                        <Stack spacing={1}>
                                        <InputLabel htmlFor="invoice">
                                           Invoice No.
                                          </InputLabel>
                                          <FormControl fullWidth>
                                            <OutlinedInput
                                              type="text"
                                              id="invoice"
                                              placeholder="Invoice No..."
                                              fullWidth
                                              size="small"
                                              value={invoiceNo}
                                              onChange={(e: any) =>
                                                setInvoiceNo(e.target.value)
                                              }
                                            />
                                          </FormControl>
                                        </Stack>
                                      </Grid>
                                      <Grid item xs={12} lg={4}>
                                        <Stack spacing={1}>
                                          <InputLabel htmlFor="enddate">
                                            Customer
                                          </InputLabel>
                                          <Autocomplete
                                            value={val}
                                            inputValue={inputValue}
                                            onChange={(event, newValue) => {
                                              setVal(newValue);
                                            }}
                                            onInputChange={(
                                              event,
                                              newInputValue
                                            ) => {
                                              setInputValue(newInputValue);
                                            }}
                                            options={option}
                                            getOptionLabel={(option) =>
                                              option.title || ""
                                            }
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                variant="outlined"
                                                placeholder="Find or customer"
                                              />
                                            )}
                                          />
                                        </Stack>
                                      </Grid>
                                      <Grid item xs={12} lg={4}>
                                        <Stack spacing={1}>
                                        <InputLabel htmlFor="payment">
                                           Payment Method
                                          </InputLabel>
                                          <FormControl fullWidth>
                                            <OutlinedInput
                                              type="text"
                                              id="payment"
                                              placeholder="Payment Method..."
                                              fullWidth
                                              size="small"
                                              value={paymentType}
                                              onChange={(e: any) =>
                                                setPaymentType(e.target.value)
                                              }
                                            />
                                          </FormControl>
                                        </Stack>
                                      </Grid>
                                      <Grid item xs={12} lg={4}>
                                        <Stack spacing={1}>
                                          <InputLabel htmlFor="startdate">
                                            Date Range (start date)
                                          </InputLabel>
                                          <DatePicker
                                            className="myDatePicker"
                                            id="startdate"
                                            selected={startdate}
                                            dateFormat="MM/dd/yyyy"
                                            placeholderText="Start Date"
                                            onChange={(date: any) =>
                                              setstartdate(date)
                                            }
                                          />
                                        </Stack>
                                      </Grid>
                                      <Grid item xs={12} lg={4}>
                                        <Stack spacing={1}>
                                          <InputLabel htmlFor="enddate">
                                            End Date
                                          </InputLabel>
                                          <DatePicker
                                            className="myDatePicker"
                                            id="enddate"
                                            selected={enddate}
                                            dateFormat="MM/dd/yyyy"
                                            placeholderText="End Date"
                                            onChange={(date: any) =>
                                              setenddate(date)
                                            }
                                          />
                                        </Stack>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        style={{ marginBottom: "10px" }}
                                        className="filtercss"
                                      >
                                        <div onClick={popupState.close}>
                                          <Button
                                            size="small"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            sx={{ width: 150 }}
                                            // onClick={popupState.close}
                                            onClick={(e) => filterApply(e)}
                                          >
                                            <b>Apply Filter</b>
                                            <span
                                              style={{
                                                fontSize: "2px",
                                                paddingLeft: "10px",
                                              }}
                                            ></span>
                                          </Button>
                                        </div>
                                        &nbsp;&nbsp;
                                        <div
                                          onClick={popupState.close}
                                          className="resetfiltercss"
                                        >
                                          <Button
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            sx={{ width: 150 }}
                                            onClick={ResetFilterValue}
                                          >
                                            <b>Reset Filter</b>
                                            <span
                                              style={{
                                                fontSize: "2px",
                                                paddingLeft: "10px",
                                              }}
                                            ></span>
                                          </Button>
                                        </div>
                                      </Grid>
                                    </Grid>
                                  </Stack>
                                </form>
                              </Grid>
                            </Container>
                          </Menu>
                        </Box>
                      )}
                    </PopupState>
                    <FormControl>
                      <TextField
                        placeholder="Search..."
                        size="small"
                        value={searchquery}
                        type="search..."
                        onInput={(e) => handleSearch(e)}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
                {/*bread cump */}
                {/* {myload ? <Loader /> : */}
                <Table style={{ marginTop: "20px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                        //onChange={handleCheck}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography>RECEIPT ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>INVOICE ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>CUSTOMER NAME</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>CUSTOMER EMAIL</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>ACTIVITY NAME</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>AMOUNT</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>PAY DATE</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>TRANSACTION ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>PAYMENT METHOD</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>ACTION</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {DATA.currentData() &&
                      DATA.currentData().map((item: any, key: any) => {
                        return (
                          <TableRow
                            key={key}
                            hover
                            tabIndex={-1}
                            role="checkbox"
                            className="boder-bottom"
                          >
                            <TableCell padding="checkbox">
                              <Checkbox />
                            </TableCell>
                            <TableCell align="left">{item?.receiptId}</TableCell>
                            <TableCell align="left">{item?.invoiceId}</TableCell>
                            <TableCell align="left">{item?.customer_name}</TableCell>
                            <TableCell align="left">{item?.customer_email}</TableCell>
                            <TableCell align="left">{item?.activity_name}</TableCell>
                            <TableCell align="left">{item?.amount}</TableCell>
                            <TableCell align="left"> {moment(item?.createdAt, "YYYY-MM-DD").format(
                                  "MMM DD, YYYY"
                                )}</TableCell>
                            <TableCell align="left">{item?.transactionId}</TableCell>
                            <TableCell align="left">{item?.paymentMethod}</TableCell>
                           
                            <TableCell align="left">
                              <Stack
                                direction="row"
                                spacing={1}
                                className="action"
                              >
                                 <Button className="idiv">
                                  <Image
                                     onClick={() => generateSimplePDF(item)}
                                    src="/download.svg"
                                    alt="Picture of the author"
                                    width={35}
                                    height={35}
                                  />
                                </Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
                {/* } */}
                {reports == "" ? <h3>No Record found</h3> : ""}
                <Stack
                  style={{
                    marginBottom: "10px",
                    marginTop: "10px",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                  direction="row"
                >
                  <Pagination
                    className="pagination"
                    count={count}
                    page={page}
                    color="primary"
                    onChange={handlePageChange}
                  />
                  <FormControl>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={5}
                      onChange={handlerowchange}
                      size="small"
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </TableContainer>
            </Card>
          </div>
          <MainFooter />
        </Box>
      </Box>
      <DeleteFormDialog id={id} open={deleteOpen} closeDialog={closePoP} />
      <ToastContainer />
    </>
  );
}
