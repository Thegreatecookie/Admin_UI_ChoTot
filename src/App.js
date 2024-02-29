import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ROUTE_PATH } from "./constants";
import { SocketProvider } from "./contexts";
import { Template } from "./scenes/global/template";
import Home from "./scenes/home";
import AddCategory from "./scenes/manage/add-category";
import CategoryManage from "./scenes/manage/category";
import PostManage from "./scenes/manage/post";
import PostPending from "./scenes/manage/post-pending";
import StaffManage from "./scenes/manage/staff";
import UserManage from "./scenes/manage/user";
import PostDetails from "./scenes/post-details";
import ChangePass from "./scenes/profile/change-pass";
import Signin from "./scenes/signin";
import DetailsUser from "./scenes/user-details";
import PrivateRoutes from "./scenes/utils/PrivateRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import TransactionPending from "./scenes/manage/transaction-pending";
import TransactionManage from "./scenes/manage/transaction";
import PostDetail from "./scenes/post-details/detail";
function App() {
  return (
    <div className="app">
      <SocketProvider>
        <Routes>
          <Route path={ROUTE_PATH.SIGNIN} element={<Signin />} />
          <Route path="/" element={<Template />}>
            <Route index element={<Navigate to={ROUTE_PATH.HOME} />} />
            <Route element={<PrivateRoutes />}>
              <Route path={ROUTE_PATH.HOME} element={<Home />} />
              <Route path={ROUTE_PATH.REVIEW_POST} element={<PostPending />} />
              <Route path={ROUTE_PATH.MANAGE_POST} element={<PostManage />} />
              <Route path={ROUTE_PATH.MANAGE_USER} element={<UserManage />} />
              <Route path={ROUTE_PATH.MANAGE_STAFF} element={<StaffManage />} />
              <Route
                path={ROUTE_PATH.POST_DETAILS}
                element={<PostDetails />}
              ></Route>
              <Route
                path={ROUTE_PATH.POST_DETAIL}
                element={<PostDetail />}
              ></Route>
              <Route
                path={ROUTE_PATH.CHANGE_PASSWORD}
                element={<ChangePass />}
              ></Route>
              <Route
                path={ROUTE_PATH.MANAGE_CATEGORY}
                element={<CategoryManage />}
              ></Route>
              <Route
                path={ROUTE_PATH.ADD_CATEGORY}
                element={<AddCategory />}
              ></Route>
              <Route
                path={ROUTE_PATH.USER_DETAILS}
                element={<DetailsUser />}
              ></Route>
              <Route path={ROUTE_PATH.REVIEW_TRANSACTION} element={<TransactionPending />}></Route>
              <Route path={ROUTE_PATH.MANAGE_TRANSACTION} element={<TransactionManage />}></Route>
            </Route>
          </Route>
        </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
