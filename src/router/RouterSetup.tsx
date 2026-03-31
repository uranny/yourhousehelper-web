import { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import ROUTE_KEYS from "../constants/route";
import { ReportProvider } from "../contexts/report";
import { colors } from "../constants/color";
import Loading from "../components/loading";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Record = lazy(() => import("../pages/Record"));
const Signin = lazy(() => import("../pages/Signin"));
const Signup = lazy(() => import("../pages/Signup"));
const Start = lazy(() => import("../pages/Start"));
const Report = lazy(() => import("../pages/Report"));
const ReportDetail = lazy(() => import("../pages/Report/Detail"));

function ReportLayout() {
  return (
    <ReportProvider>
      <Outlet />
    </ReportProvider>
  );
}

function RouterSetup() {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path={ROUTE_KEYS.ROOT} element={<Start />} />
        <Route path={ROUTE_KEYS.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTE_KEYS.RECORD} element={<Record />} />
        <Route path={ROUTE_KEYS.SIGNIN} element={<Signin />} />
        <Route path={ROUTE_KEYS.SIGNUP} element={<Signup />} />
        <Route element={<ReportLayout />}>
          <Route path={ROUTE_KEYS.REPORT} element={<Report />} />
          <Route path={ROUTE_KEYS.REPORT_DETAIL} element={<ReportDetail />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default RouterSetup;
