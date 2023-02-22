import * as React from "react";
import { useRouter } from "next/router";
import ViewCreditNotes from "../../modules/CreditNotes/viewcreditnotes";
export default function Users() {
    const router = useRouter();
    const { userId } = router.query;
    return (
        <ViewCreditNotes id={userId} />
    );
}
