import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import "moment/locale/vi";

function TransactionManage() {
  moment.locale("vi");
  const [trans, setTrans] = useState();
  const navigate = useNavigate();
  const time = (date) => {
    return <td>{moment(date).fromNow()}</td>;
  };
  const status = (status) => {
    if (status === "Thành công")
      return <td style={{ fontWeight: "bold", color: "green" }}>{status}</td>;
    else if (status === "Từ chối") {
      return <td style={{ fontWeight: "bold", color: "red" }}>{status}</td>;
    } else {
      return <td style={{ fontWeight: "bold" }}>{status}</td>;
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:3003/transactions", {
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
                Số điện thoại
              </th>
              <th style={{ width: "5%" }} scope="col">
                Số xu
              </th>
              <th style={{ width: "5%" }} scope="col">
                Trạng thái
              </th>
              <th style={{ width: "5%" }} scope="col">
                Thời gian duyệt
              </th>
            </tr>
          </thead>
          <tbody>
            {trans?.map((i) => (
              <tr>
                {" "}
                <th key={i._id} scope="row">
                  {i._id}
                </th>
                <td>{i.phone}</td>
                <td>{i.value}</td>
                {status(i.status)}
                {time(i.updatedAt)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionManage;
