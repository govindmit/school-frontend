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
  styled,
  Grid,
  InputLabel,
  Modal,
} from "@mui/material";
import moment from "moment";
import Box from "@mui/material/Box";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiFilterAlt, BiShow } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Fill, RiFileCopyLine } from "react-icons/ri";
import MiniDrawer from "../../sidebar";
import { api_url, auth_token } from "../../api/hello";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import ConfirmBox from "../../commoncmp/confirmbox";
import commmonfunctions from "../../commonFunctions/commmonfunctions";
import AddSalesOrder from "./add_new_sales_order";
import MainFooter from "../../commoncmp/mainfooter";
import getwayService from "../../../services/gatewayService"
import Alert from '@mui/material/Alert';
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface StyledTabProps {
  label: string;
  onClick:any;
  className?:any;
}

//pagination function
function usePagination(data: any, itemsPerPage: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);
  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
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
  customerType: number;
  status: number;
};

export default function SalesOrderList() {
  const [salesOrder, setSalesOrder] = useState<any>([]);
  const [fullSalesOrder, setFullSalesOrder] = useState<any>([]);
  const [searchquery, setsearchquery] = useState("");
  const [searchdata, setsearchdata] = useState([]);
  const [All, setAll] = useState(0);
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [value, setValue] = React.useState(0);
  const [custpermit, setcustpermit] = useState<any>([]);
  const [roleid, setroleid] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [activeTab, setActiveTab] = useState("");
const [newSalesOpen, setNewSalesOpen] = useState(false);
const [showSuccess,setShowSuccess] = React.useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // verify user login
  let logintoken: any;
  const router = useRouter();
  React.useEffect(() => {
    logintoken = localStorage.getItem("QIS_loginToken");
    if (logintoken === undefined || logintoken === null) {
      router.push("/");
    }
    commmonfunctions.GivenPermition().then((res) => {
      if (res.roleId == 1) {
        setroleid(res.roleId);
        //router.push("/userprofile");
      } else if (res.roleId > 1) {
        commmonfunctions.ManageActivity().then((res) => {
          if (!res) {
            router.push("/userprofile");
          } else {
            setcustpermit(res);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
          let search = router.query;
          let amexOrderId = search.orderid;
          let paymentMethod = search.paymentMethod;
          let creditNoteId = search.creditNoteId;
          if(paymentMethod && amexOrderId){
            console.log("order created");
            
            orderPlaced(amexOrderId,paymentMethod,creditNoteId);
          }
    fetchData();
  }, [router.query]);

  const orderPlaced = async(amexOrderId:any,paymentMethod:any,creditNoteId:any)=>{
    const data = {orderId :amexOrderId}
    var apiRequest = data;
    var requestUrl = await getwayService.getRequestUrl("REST", apiRequest);
    getwayService.retriveOrder( requestUrl, function (orderresult:any) {
      console.log("order result =>",orderresult);
      if(orderresult.status === 200){
        const amextransactionData = orderresult.data
        const transactionData = {
          idForPayment:amexOrderId,
          totalAmount:amextransactionData?.transaction[0].transaction.amount,
          paidAmount:amextransactionData?.transaction[0].transaction.amount,
          paymentMethod:paymentMethod,
          amexorderId:amexOrderId,
          transactionId:amextransactionData?.transaction[0].transaction.id,
          creditNotesId: creditNoteId
        }
        console.log("transactionData",transactionData);
          transactionSaveInDB(transactionData);
      }
        
      });
}

const transactionSaveInDB = async(data:any)=>{
getwayService.transactionDataSaveInDB(data,function(result:any){
  console.log("final result =>",result);
   setShowSuccess(true)
  setTimeout(callBack_func, 5000);
  function callBack_func() {
    setShowSuccess(false)
    document.location.href = `${process.env.NEXT_PUBLIC_AMEX_SALES_ORDER_REDIRECT_URL}`;
  }

});
}

  //get salesOrder
  const url = `${api_url}/getSalesOrders`;
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: auth_token,
          "x-access-token": logintoken,
        },
      });
      const json = await response.json();
      setSalesOrder(json.data);
      setFullSalesOrder(json.data);
      setsearchdata(json.data);
      setAll(json.data.length);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  //searching
  const handleSearch = (e: any) => {
    setsearchquery(e.target.value);
    if (e.target.value === "") {
      if (activeTab === "Paid") {
        setSalesOrder(paidOrder);
      } else if (activeTab === "Delete") {
        setSalesOrder(deleteOrder);
      } else {
        setSalesOrder(searchdata);
      }
    } else {
      const filterres = searchdata.filter((item: any) => {
        return (
          item?.activity_name
            ?.toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item?.customer_email
            ?.toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item?.customer_name
            ?.toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          `${item?.amount}`.includes(e.target.value)
        );
      });
      const dtd = filterres;
      setSalesOrder(dtd);
    }
  };

  const paidOrder = fullSalesOrder?.filter((a: any) => a?.status === 0);
  const deleteOrder = fullSalesOrder?.filter((a: any) => a?.isDeleted === 1);
  const allListData = fullSalesOrder?.filter((a: any) => a);

  //pagination
  const [row_per_page, set_row_per_page] = useState(5);
  function handlerowchange(e: any) {
    set_row_per_page(e.target.value);
  }
  let [page, setPage] = useState(1);
  const PER_PAGE = row_per_page;
  const count = Math.ceil(salesOrder.length / PER_PAGE);
  const DATA = usePagination(salesOrder, PER_PAGE);

  const handlePageChange = (e: any, p: any) => {
    setPage(p);
    DATA.jump(p);
  };

  //delete user
  const [deleteData, setDeleteData] = useState<any>({});

  function openDelete(data: any) {
    // setdeleteConfirmBoxOpen(true);
    handleOpen();
    setDeleteData(data);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleSalesDelete = async () => {
    await axios({
      method: "DELETE",
      url: `${api_url}/deleteSalesOrders/${deleteData.id}`,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        toast.success("Sales Record delete Successfully !");
        handleClose();
        fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = () => {
    setActiveTab("Delete");
    if(DATA?.currentPage === 1){
          setSalesOrder(deleteOrder);
          handlePageChange("",1)
    }else{
        setSalesOrder(deleteOrder);
       handlePageChange("",1)
    }
  };
  const handleAll = () => {
    if(DATA?.currentPage === 1){
      setSalesOrder(allListData);
    }else{
      handlePageChange("",1)
    }
    // fetchData();
  };
  const handlePaid = () => {
    setActiveTab("Paid");
    if(DATA?.currentPage === 1){
      setSalesOrder(paidOrder);
    }else{
       handlePageChange("",1)
    }
  };

  function handleNewSalesOrder() {
    setNewSalesOpen(true);
  }

  const closePoP = (data: any) => {
    fetchData();
    setNewSalesOpen(false);
  };

  const style1 = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "1px solid grey",
    borderRadius: "8px",
    boxShadow: 24,
    // p: 4,
  };


  const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
    }),
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style1}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
              className="deleteusercss"
            >
              Delete Order
            </Typography>
            <div className="linecss"></div>
            <Typography
              id="keep-mounted-modal-description"
              sx={{ mt: 2 }}
              className="confirmcss"
            >
              Are you sure want to delete from the records.
            </Typography>
            <br />
            <div className="popupcss" style={{ textAlign: "end" }}>
              <Button color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button color="success" onClick={handleSalesDelete}>
                Ok
              </Button>
            </div>
          </Box>
        </Modal>
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
                      Sales
                    </Link>
                  </Breadcrumbs>
                </Stack>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#333333" }}
                >
                  SALES ORDER
                </Typography>
                {        showSuccess &&    <Alert style={{width:'50%',height:50,marginLeft:430,marginTop:"-50px"}} severity="success">Thanks You ! Payment Recieved</Alert>
}
              </Stack>
              <Stack>
              <Button
                className="button-new"
                variant="contained"
                size="small"
                sx={{ width: 150 }}
                onClick={handleNewSalesOrder}
              >
                <b>ADD SALES ORDER</b>
              </Button>
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
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <AntTab
                        className="filter-list"
                        label={`All (${All})`}
                        {...a11yProps(0)}
                        onClick={handleAll}
                      />
                      <AntTab
                        label={`Paid (${paidOrder?.length})`}
                        {...a11yProps(2)}
                        onClick={handlePaid}
                      />
                      <AntTab
                        label={`Delete (${deleteOrder?.length})`}
                        {...a11yProps(1)}
                        onClick={handleDelete}
                      />
                    </Tabs>
                  </Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    className="fimport-export-box"
                  >
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
                <Table style={{ marginTop: "20px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                        //onChange={handleCheck}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography>SALES INVOICE ID</Typography>
                      </TableCell>
                      <TableCell className="t-name">
                        <Typography>ACTIVITY</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>EMAIL</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>CUSTOMER NAME</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>STATUS</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography width={150}>AMOUNT</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>ACTION</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {DATA.currentData()} */}
                    {DATA.currentData() &&
                      DATA.currentData().map((item: any, key: any) => {
                        const {
                          id,
                          activity_name,
                          amount,
                          customer_email,
                          customer_name,
                          status,
                        } = item;
                        return (
                          <TableRow
                            key={key}
                            hover
                            tabIndex={-1}
                            role="checkbox"
                            className={item?.isDeleted !== 0 ? "darkBgCss" : ""}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox />
                            </TableCell>
                            <TableCell align="left">
                              <Link href={`/admin/sales_order/details/${id}`}>
                                INV-{id}
                              </Link>
                            </TableCell>
                            <TableCell align="left">{activity_name}</TableCell>
                            <TableCell align="left">{customer_email}</TableCell>
                            <TableCell align="left">{customer_name}</TableCell>
                            <TableCell align="left" className="salesStatus">
                              {" "}
                              {status === 0 ? "Paid" : ""}
                            </TableCell>
                            <TableCell align="left">$ {amount}</TableCell>
                            <TableCell align="left">
                              <Stack
                                direction="row"
                                spacing={1}
                                className="action"
                              >
                                {(custpermit && custpermit.canView === true) ||
                                roleid === 1 ? (
                                  <IconButton className="action-view">
                                    <Link
                                      href={`/admin/sales_order/details/${id}`}
                                      style={{
                                        color: "#26CEB3",
                                      }}
                                    >
                                      <BiShow />
                                    </Link>
                                  </IconButton>
                                ) : (
                                  ""
                                )}

                                {(custpermit &&
                                  custpermit.canDelete === true) ||
                                roleid === 1 ? (
                                  item?.isDeleted === 0 ? (
                                    <IconButton
                                      className="action-delete"
                                      style={{ color: "#F95A37" }}
                                      onClick={() => openDelete(item)}
                                    >
                                      <RiDeleteBin5Fill />
                                    </IconButton>
                                  ) : (
                                    ""
                                  )
                                ) : (
                                  ""
                                )}
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
                {/* } */}
                {salesOrder == "" ? <h3>No Record found</h3> : ""}
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
          <MainFooter/>
        </Box>
      </Box>
      {
        newSalesOpen ? (
          <AddSalesOrder open={newSalesOpen} closeDialog={closePoP} />
        ) : (
          ""
        )
      }
      <ToastContainer />
    </>
  );
}
