import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ROUTE_KEYS from "../constants/route";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Record = lazy(() => import("../pages/Record"));
const Signin = lazy(() => import("../pages/Signin"));
const Signup = lazy(() => import("../pages/Signup"));
const Start = lazy(() => import("../pages/Start"));
const Report = lazy(() => import("../pages/Report"));

function RouterSetup() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <Routes>
        <Route path={ROUTE_KEYS.ROOT} element={<Start />} />
        <Route path={ROUTE_KEYS.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTE_KEYS.RECORD} element={<Record />} />
        <Route path={ROUTE_KEYS.SIGNIN} element={<Signin />} />
        <Route path={ROUTE_KEYS.SIGNUP} element={<Signup />} />
        <Route path={ROUTE_KEYS.REPORT} element={<Report />} />
      </Routes>
    </Suspense>
  );
}

export default RouterSetup;
