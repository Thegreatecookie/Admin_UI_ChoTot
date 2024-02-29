import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";
import { Pagination } from "@mui/material";

function UserManage() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [hideArray, setHideArray] = useState([]);

  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  const transformStatus = (status) => {
    switch (status) {
      case true:
        return "Hoạt động";
      case false:
        return "Khóa";
      // Thêm các trường hợp khác nếu cần thiết
      default:
        return status;
    }
  };
  const toggleHide = (index) => {
    const newHideArray = [...hideArray];
    newHideArray[index] = !newHideArray[index];
    setHideArray(newHideArray);
  };
  const changeStatus = async (userID, currentStatus, index) => {
    console.log(userID, currentStatus);
    try {
      await axios
        .put(
          `http://localhost:3003/users/change-status`,
          {
            id: userID,
            status: currentStatus,
          },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          const newHideArray = [...hideArray];
          newHideArray[index] = currentStatus === true;
          setHideArray(newHideArray);
        });
    } catch (error) {
      console.error("Error hiding post:", error);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3003/users/users?page=${page || 1}&pageSize=10`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data.users);
        const initialHideArray = res.data.users.map((i) => i.active === false);
        setHideArray(initialHideArray);
        setCount(res.data.totalPage);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [page , user]);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="col-12" style={{ marginTop: "10px", width: "80%" }}>
        <h5>Danh sách người dùng</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Tên</th>
              <th scope="col">Số diện thoại</th>
              <th scope="col">Email</th>
              <th scope="col">Trạng thái</th>
              <th scope="col"> Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((i, index) => (
              <tr>
                {" "}
                <th key={index} scope="row">
                  {i.firstName + " " + i.lastName}
                </th>
                <td>{i.phone}</td>
                <td>{i.email}</td>
                <td>{transformStatus(i.active)}</td>
                <td>
                  {" "}
                  <button
                    className="btn btn-info"
                    onClick={() =>
                      navigate(ROUTE_PATH.USER_DETAILS, {
                        state: { id: i._id },
                      })
                    }
                  >
                    Xem chi tiết
                  </button>{" "}
                  <button
                    className="btn btn-success"
                    hidden={!hideArray[index]}
                    onClick={() => {
                      toggleHide(index);
                      changeStatus(i._id, i.active, index);
                    }}
                  >
                    Mở tài khoản
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    hidden={hideArray[index]}
                    onClick={() => {
                      toggleHide(index);
                      changeStatus(i._id, i.active, index);
                    }}
                  >
                    Khóa tài khoản
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          count={count}
          page={page}
          onChange={handleChangePagination}
        />
      </div>
    </div>
  );
}

export default UserManage;
