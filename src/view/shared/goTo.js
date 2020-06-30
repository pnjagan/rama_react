import { log } from "../../state/utils";

export const goTo = (history, e, l) => {
  e.preventDefault();
  log("Prev :", history.location.pathname);
  log("Current :", l);
  history.push(l);
};
