import React, { useState, useEffect } from "react";

import { InvoiceCrUpd } from "./InvoiceCrUpd";

// import { CustomerSearch } from "./CustomerSearch";
import { ETabContainer } from "./ETabContainer";
// import { ReusableCustomer } from "./EntityCrUpd";

//entityName
//searchComponent
//updateComponent
export const Invoice = () => (
  // <ETabContainer
  //   entityName="Customer"
  //   searchComponent={CustomerSearch}
  //   updateComponent={CustomerCrUpd}
  // />

  <ETabContainer
    entityName="Invoice"
    searchComponent={() => "Invoice Search"}
    updateComponent={InvoiceCrUpd}
  />
);
