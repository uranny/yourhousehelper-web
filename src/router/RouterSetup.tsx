import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Table from "../pages/Table";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Start from "../pages/Start";
import Report from "../pages/Report";
import ROUTE_KEYS from "../constants/route";

function RouterSetup() {
  return (
    <Routes>
      <Route path={ROUTE_KEYS.ROOT} element={<Start />} />
      <Route path={ROUTE_KEYS.DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTE_KEYS.TABLE} element={<Table />} />
      <Route path={ROUTE_KEYS.SIGNIN} element={<Signin />} />
      <Route path={ROUTE_KEYS.SIGNUP} element={<Signup />} />
      <Route path={ROUTE_KEYS.REPORT} element={<Report />} />
    </Routes>
  );
}

export default RouterSetup;
