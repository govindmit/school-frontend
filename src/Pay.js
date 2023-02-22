import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import  {keyGen}   from './util/commonUtils.js';
import { getSession } from './services/gatewayService.js';
import {Helmet} from "react-helmet";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Amex',
  'Case',
  'Debit Card',
  'Bank',

];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const Pay = () => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState('');
  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
    console.log("name  =>",event.target.value);
  };
  const handlePayNow = async ()=>{
    var orderId = keyGen(10);
    
    var requestData = {
      "apiOperation": "CREATE_CHECKOUT_SESSION",
      "order": {
          "id": orderId,
          "amount": "100.00",
          "currency": "QAR",
      },
      "interaction": {
        "returnUrl":`http://localhost:3000/?orderid=${orderId}`,
          "operation": "PURCHASE",
          "merchant": {
              "name": "QATAR INTERNATIONAL SCHOOL - ONLINE 634",
              "address": {
                  "line1": "200 Sample St",
                  "line2": "1234 Example Town"
              }
          }
      }
   }
   await getSession(requestData,function(result){
    console.log("result =>",result);
   
   });
   
  }

  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                {/* <link rel="canonical" href="http://example.com/example" /> */}
                <script src="https://amexmena.gateway.mastercard.com/static/checkout/checkout.min.js" type="text/javascript" />
               
            </Helmet>
      <h1>Payment With Amex</h1>
   <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-select-small">Payment Method</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={paymentMethod}
        label="Payment Method"
        onChange={handleChange}
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
        {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        
      </Select>
      <br/>
      <Button onClick={()=>{handlePayNow()}} variant="contained" color="success">
        Pay Now
      </Button>
    </FormControl>
     
    </div>
  )
}
