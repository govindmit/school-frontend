import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import { api_url, auth_token } from "../api/hello";
import AddNewParent from "../customer/addNewParent";

export default function AddCustomer({ Data, PId, pname }: { Data: any, PId: any, pname: any }) {
  const [users, setUsers] = useState<any>([]);
  const [opens, setOpens] = React.useState(false);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<any>({ id: PId, title: pname });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const url = `${api_url}/getuser`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: auth_token,
        },
      });
      const res = await response.json();
      setUsers(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const option: { id: number; title: string }[] = [];
  users &&
    users.map((data: any, key: any) => {
      return option.push({
        id: data.id,
        title: data.name,
      });
    });
  const handleClickOpen = () => {
    setOpens(true);
  };
  const closePoP = (item: any) => {
    setOpens(false);
    getUser();
  };

  return (
    <>
      <Autocomplete
        size="small"
        value={value}
        inputValue={inputValue}
        onChange={(event, newValue) => {
          setValue(newValue);
          Data(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={option}
        getOptionLabel={(option) => option.title || ""}
        isOptionEqualToValue={(option, title) => option.title === value.title}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search && Select Customer"
          />
        )}
        noOptionsText={
              <span style={{color:"red"}}>
                The customer doesn't exist with this name. 
              </span>
        }
      />
    </>
  );
}