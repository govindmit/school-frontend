import {
  Card,
  Button,
  Breadcrumbs,
  Box,
  styled,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { BsTelegram } from "react-icons/bs";
import { Grid, InputLabel, Stack } from "@mui/material";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { api_url, base_url } from "../../api/hello";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import MenuItem from "@mui/material/MenuItem";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paper from "@mui/material/Paper";
import MiniDrawer from "../../sidebar";
import { useRouter } from "next/router";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
enum typeEnum {
  Free = "Free",
  Paid = "Paid",
}

enum statusEnum {
  Active = "Active",
  Archive = "Archive",
  Draft = "Draft",
}
type FormValues = {
  name: string;
  type: typeEnum;
  image: any;
  shortdescription: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  status: statusEnum;
  startDates: string;
};
type HTMLData = {
  content: { "mycustom-html": string };
};
export default function Guardians() {
  let localUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [activity, setActivity] = useState<FormValues | any>("");
  const [htmlData, setHtmlData] = useState<HTMLData>({
    content: { "mycustom-html": "<p>demo</p>" },
  });
  const router = useRouter();
  const { activityId } = router.query;
  const getActivityDetail = async () => {
    try {
      const response = await fetch(
        `${api_url}/getactivitydetails/${activityId}`,
        {
          method: "GET",
        }
      );
      const res = await response.json();
      console.log(res, "responce");
      setActivity(res.data);
      setHtmlData(res.data[0].description);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getActivityDetail();
  }, []);
  let data = "<h1>hello</h1>";
  console.log(htmlData, "htmtdata");
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="guardianBar">
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
                      href="/"
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
                      Activities
                    </Link>
                  </Breadcrumbs>
                </Stack>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#333333" }}
                >
                  VIEW ACTIVITY
                </Typography>
              </Stack>
            </Stack>
            <Card
              style={{ margin: "10px", padding: "15px" }}
              className="box-shadow"
            >
              <span className="title" style={{ fontSize: "40px" }}>
                {activity[0]?.name}
              </span>
              <div className="date" style={{ display: "flex" }}>
                <div className="sdiv">
                  <h4>startDate : {activity[0]?.startDate}</h4>&nbsp;&nbsp;
                </div>
                <div className="sdiv">
                  <h4>endDate : {activity[0]?.endDate}</h4>
                </div>
                <div style={{ marginLeft: "55%" }}>
                  <h4>Amount ${activity[0]?.price}</h4>
                </div>
              </div>
              {/* <p>{activity[0]?.description}</p> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: activity[0]?.description,
                }}
              ></div>
              <div
                dangerouslySetInnerHTML={{
                  __html: activity[0]?.shortDescription,
                }}
              ></div>
            </Card>
          </div>
        </Box>
      </Box>
    </>
  );
}
