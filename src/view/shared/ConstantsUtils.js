import { LoginPage } from "../pages/LoginPage";
import { Dashboard } from "../components/Dashboard";
import { PlaceHolder } from "../components/PlaceHolder";
import { Customer } from "../components/Customer";

import React from "react";

const PathFunctionMap = Object.create(null);

PathFunctionMap.HOME = {
  path: "/",

  component: Dashboard,
};

PathFunctionMap.SIGN_IN = {
  path: "/signin",

  component: LoginPage,
};

PathFunctionMap.USER_PREFERENCE = {
  path: "/preference",

  component: () => {
    return <PlaceHolder componentName="Preference" />;
  },
};

PathFunctionMap.INVOICE = {
  path: "/invoice",

  component: () => {
    return <PlaceHolder componentName="Invoice" />;
  },
};

PathFunctionMap.CUSTOMER = {
  path: "/customer",

  component: Customer,
};

PathFunctionMap.ITEM = {
  path: "/item",

  component: () => {
    return <PlaceHolder componentName="Item" />;
  },
};

PathFunctionMap.CONFIG = {
  path: "/config",

  component: () => {
    return <PlaceHolder componentName="Config" />;
  },
};

PathFunctionMap.CONFIG_PARAM = {
  path: "/config/param",

  component: () => {
    return <PlaceHolder componentName="Config/Parameters" />;
  },
};

PathFunctionMap.CONFIG_USER = {
  path: "/config/user",

  component: () => {
    return <PlaceHolder componentName="Config/Users" />;
  },
};

PathFunctionMap.CONFIG_TAX = {
  path: "/config/tax",

  component: () => {
    return <PlaceHolder componentName="Config/Tax" />;
  },
};

PathFunctionMap.ONLINE_HELP = {
  path: "/help",

  component: () => {
    return <PlaceHolder componentName="Online help" />;
  },
};

PathFunctionMap.CONTACT_US = {
  path: "/contact",

  component: () => {
    return <PlaceHolder componentName="Contact US" />;
  },
};

Object.freeze(PathFunctionMap);

const Display = {
  MOBILE: 0,
  TAB: 1,
  DESK: 2,
  UNKNOWN: -1,
};

Object.freeze(Display);

export { PathFunctionMap, Display };
