import * as React from "react";
import cyberSourceSecureConfig from "../helper/cyberSourceSecureConfig";

export default function CheckPayment() {
  const currentDateTime = new Date().toISOString().split(".")[0] + "Z";
  let data: any = {
    access_key: "cfc1af4483773756a54a990e585ce7c5",
    profile_id: "70647EEB-EDE3-4859-9DD9-6E4605C9FABE",
    req_profile_id: "70647EEB-EDE3-4859-9DD9-6E4605C9FABE",
    ots_profileid: "70647EEB-EDE3-4859-9DD9-6E4605C9FABE",
    merchant_id: "cbq_qis_qar",
    transaction_uuid: "6401e70",
    signed_field_names:
      "access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency",
    unsigned_field_names: "",
    signed_date_time: currentDateTime,
    locale: "en",
    transaction_type: "sale,create_payment_token",
    // 'reference_number': refrensh__number,
    reference_number: "1429",
    amount: "300",
    currency: "QAR",
  };
  let signature = cyberSourceSecureConfig.sign(data);
  console.log("signature =>", signature);

  data["signature"] = signature;

  const [accessKey, setAccessKey] = React.useState<any>(
    "cfc1af4483773756a54a990e585ce7c5"
  );
  const [profileId, setProfileId] = React.useState<any>(
    "70647EEB-EDE3-4859-9DD9-6E4605C9FABE"
  );
  const [reqProfileId, setReqProfileId] = React.useState<any>(
    "70647EEB-EDE3-4859-9DD9-6E4605C9FABE"
  );
  const [otsProfileid, setOtsProfileid] = React.useState<any>(
    "70647EEB-EDE3-4859-9DD9-6E4605C9FABE"
  );
  const [merchantId, setMerchantId] = React.useState<any>("cbq_qis_qar");
  const [transactionUuid, setTransactionUuid] = React.useState<any>("6401e70");
  const [signedFieldNames, setSignedFieldNames] = React.useState<any>(
    "access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency"
  );
  const [unsignedFieldNames, setUnsignedFieldNames] = React.useState<any>("");
  const [signedDateTime, setSignedDateTime] =
    React.useState<any>(currentDateTime);
  const [locale, setLocale] = React.useState<any>("en");
  const [transactionType, setTransactionType] = React.useState<any>(
    "sale,create_payment_token"
  );
  const [referenceNumber, setReferenceNumber] = React.useState<any>("1429");
  const [amount, setAmount] = React.useState<any>("300");
  const [currency, setCurrency] = React.useState<any>("QAR");

  return (
    <>
      <div>
        <form
          id="payment_confirmation"
          action="https://testsecureacceptance.cybersource.com/pay"
          method="post"
        >
          <input
            type="text"
            id="access_key"
            name="access_key"
            value={accessKey}
          />
          <input
            type="text"
            id="profile_id"
            name="profile_id"
            value={profileId}
          />
          <input
            type="text"
            id="req_profile_id"
            name="req_profile_id"
            value={reqProfileId}
          />
          <input
            type="text"
            id="ots_profileid"
            name="ots_profileid"
            value={otsProfileid}
          />
          <input
            type="text"
            id="merchant_id"
            name="merchant_id"
            value={merchantId}
          />
          <input
            type="text"
            id="transaction_uuid"
            name="transaction_uuid"
            value={transactionUuid}
          />
          <input
            type="text"
            id="signed_field_names"
            name="signed_field_names"
            value={signedFieldNames}
          />
          <input
            type="text"
            id="unsigned_field_names"
            name="unsigned_field_names"
            value={unsignedFieldNames}
          />
          <input
            type="text"
            id="signed_date_time"
            name="signed_date_time"
            value={signedDateTime}
          />
          <input type="text" id="locale" name="locale" value={locale} />
          <input
            type="text"
            id="transaction_type"
            name="transaction_type"
            value={transactionType}
          />
          <input
            type="text"
            id="reference_number"
            name="reference_number"
            value={referenceNumber}
          />
          <input type="text" id="amount" name="amount" value={amount} />
          <input type="text" id="currency" name="currency" value={currency} />
          <input
            type="text"
            id="signature"
            name="signature"
            value={signature}
          />

          <input type="submit" id="submit" value="Confirm" />
        </form>
      </div>
    </>
  );
}
