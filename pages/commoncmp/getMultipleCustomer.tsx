import { Autocomplete, Button, Chip, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import { api_url, auth_token } from "../api/hello";

export default function AddCustomer({ Data, pemail, pname }: { Data: any, pemail: any, pname: any }) {
  const [users, setUsers] = useState<any>([]);
  const [opens, setOpens] = React.useState(false);
  const [inputValue, setInputValue] = useState([]);
  const [value, setValue] = useState<any>([{ email1: pemail, name: pname }]);

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

  const option: { email1: string; name: string }[] = [];
  users &&
    users.map((data: any, key: any) => {
      return option.push({
        email1: data.email1,
        name: data.name,
      });
    });

  return (
    <>
       <Autocomplete
        size="small"
        value={value}
        multiple
        onChange={(event, newValue) => {
            setValue(newValue);
            Data(newValue);
        }}
            options={option}
            getOptionLabel={(option) => option.name || ""}
            isOptionEqualToValue={(option, name) => option.name === value.name}
            freeSolo
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