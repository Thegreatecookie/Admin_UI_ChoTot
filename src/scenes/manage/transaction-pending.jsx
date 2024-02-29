import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";
import moment from "moment";
import "moment/locale/vi";

function TransactionPending() {
  
  const [trans, setTrans] = useState([]);
  const navigate = useNavigate();
  moment.locale("vi");
  const time = (date) => {
    return <td>{moment(date).fromNow()}</td>;
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3003/transactions/find-status?status=Chờ duyệt`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTrans(res.data);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error:", error);
      });
  }, []);

  const changeStatus = (id, status) => {
    axios
      .put(
        `http://localhost:3003/transactions/change-status`,
        {
          id: id,
          status: status,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setTimeout(function () {
          window.location.reload();
        }, 10);
      })
      .catch((err) => {
        console.log("ERR", err.response.data.message);
      });
  };
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
        <h5>Danh sách đơn nạp xu</h5>
        <table class="table">
          <thead>
            <tr>
              <th style={{ width: "5%" }} scope="col">
                Mã đơn
              </th>
              <th style={{ width: "5%" }} scope="col">
                {" "}
                Số điện thoại
              </th>
              <th style={{ width: "5%" }} scope="col">
                Số xu
              </th>
              <th style={{ width: "5%" }} scope="col">
                Trạng thái
              </th>
              <th style={{ width: "5%" }} scope="col">
                Thời gian tạo
              </th>

              <th style={{ width: "10%" }} scope="col">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {trans && trans.length > 0 ? (
              trans?.map((i) => (
                <tr>
                  {" "}
                  <th key={i._id} scope="row">
                    {i._id}
                  </th>
                  <td>{i.phone}</td>
                  <td>{i.value}</td>
                  <td style={{ fontWeight: "bold" }}>{i.status}</td>
                  {time(i.createdAt)}
                  <td>
                    {" "}
                    <button
                      className="btn btn-success"
                      onClick={() => changeStatus(i._id, "Thành công")}
                    >
                      Duyệt
                    </button>{" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => changeStatus(i._id, "Từ chối")}
                    >
                      Từ chối
                    </button>
                    {/* <button className="btn btn-success">Duyệt</button>{" "}
                  <button className="btn btn-danger">Từ chối</button> */}
                  </td>
                </tr>
              ))
            ) : (
              <p>Không có tin đăng cần duyệt</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionPending;
