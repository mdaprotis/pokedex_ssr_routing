import Main from "../client/components/Main/Main";
import { getPokeData } from "./helpers";

const routes = [
  {
    path: "/:id",
    component: Main,
    fetchInitialData: (path = "") => {
      let offset = path.split("/").pop();
      return getPokeData(offset);
    },
  },
];

export default routes;
