import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TableHead,
  Button,
} from "@mui/material";
import Link from "next/link";
import { BiShow } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function ActivityListing() {
  return (
    <>
      <Container>
        <Card>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>Activity Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover tabIndex={-1} role="checkbox">
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar />
                      <Typography variant="subtitle2" noWrap>
                        Shubham
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">Mangoit</TableCell>
                  <TableCell align="left">Mangoit</TableCell>
                  <TableCell align="left">Mangoit</TableCell>
                  <TableCell align="left">Mangoit</TableCell>
                  <TableCell align="left">Mangoit</TableCell>
                  <TableCell align="left">
                    <Link href="/activitydetails">
                      <Button variant="contained" size="small">
                        <BiShow />
                      </Button>
                    </Link>
                    <Link href="/editactivity">
                      <Button variant="outlined" size="small">
                        <FiEdit />
                      </Button>
                    </Link>
                    <Button variant="outlined" size="small">
                      <RiDeleteBin5Fill />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
}
