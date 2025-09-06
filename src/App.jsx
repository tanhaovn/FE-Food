
import Sidebar from "./component/layout/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};
export default App;
