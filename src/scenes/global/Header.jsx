import { Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import { API_PATH, ROUTE_PATH } from "../../constants";
import home from "../home";
import { Route, useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "admin") {
      setShow(true);
    }
  }, []);
  console.log(show);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="d-flex justify-content-start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Logo_STU.png"
            style={{ float: "left", marginRight: "7px" }}
            height="50"
          ></img>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item dropdown" hidden={show}>
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Tin đăng
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate(ROUTE_PATH.REVIEW_POST)}
                    >
                      Duyệt tin
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate(ROUTE_PATH.MANAGE_POST)}
                    >
                      Quản lý tin
                    </button>
                  </li>
                </ul>
              </li>
              <li className="nav-item" hidden={show} onClick={() => navigate(ROUTE_PATH.MANAGE_USER)}>
                <a className="nav-link active" >
                  Quản lý người dùng
                </a>
              </li>
              <li className="nav-item dropdown" hidden={show}>
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Đơn nạp xu
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate(ROUTE_PATH.REVIEW_TRANSACTION)}
                    >
                      Duyệt đơn
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate(ROUTE_PATH.MANAGE_TRANSACTION)}
                    >
                      Lịch sử đơn nạp
                    </button>
                  </li>
                </ul>
              </li>

              <li
                className="nav-item"
                hidden={!show}
                onClick={() => navigate(ROUTE_PATH.MANAGE_STAFF)}
              >
                <a className="nav-link active">Quản lý nhân viên</a>
              </li>
              <li
                className="nav-item"
                hidden={!show}
                onClick={() => navigate(ROUTE_PATH.MANAGE_CATEGORY)}
              >
                <a className="nav-link active">Quản lý danh mục</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <div className="p-2 bd-highlight">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav  mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hồ sơ
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate(ROUTE_PATH.CHANGE_PASSWORD)}
                      >
                        Đổi mật khẩu
                      </button>
                    </li>
                    <li
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("id");
                        localStorage.removeItem("role");
                        navigate(ROUTE_PATH.SIGNIN);
                      }}
                    >
                      <button className="dropdown-item">Đăng xuất</button>
                    </li>
                
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
