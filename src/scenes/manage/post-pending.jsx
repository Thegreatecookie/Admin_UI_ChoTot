import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";
import moment from "moment";
import "moment/locale/vi";
function PostPending() {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const transformStatus = (status) => {
    switch (status) {
      case "pending":
        return "Đang chờ";
      case "approved":
        return "Đã Duyệt";
      // Thêm các trường hợp khác nếu cần thiết
      default:
        return status;
    }
  };
  const time = (date) => {
    return <td>{moment(date).fromNow()}</td>;
  };
  moment.locale("vi");

  useEffect(() => {
    axios
      .get("http://localhost:3003/posts/pending", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setPost(res.data);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error:", error);
      });
  }, []);
  // console.log(post);
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
        <h5>Danh sách tin đăng</h5>
        <table class="table">
          <thead>
            <tr>
              <th style={{ width: "15%" }} scope="col">
                Tiêu đề tin đăng
              </th>
              <th style={{ width: "5%" }} scope="col">
                Trạng thái{" "}
              </th>
              <th style={{ width: "10%" }} scope="col">
                Thời gian đăng{" "}
              </th>
              <th style={{ width: "10%" }} scope="col">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {post && post.length > 0 ? (
              post?.map((i) => (
                <tr>
                  {" "}
                  <th key={i.title} scope="row">
                    {i.title}
                  </th>
                  <td>{transformStatus(i.status)}</td>
                  {time(i.updatedAt)}
                  <td>
                    {" "}
                    <button
                      className="btn btn-info"
                      onClick={() =>
                        navigate(ROUTE_PATH.POST_DETAILS, {
                          state: { id: i._id },
                        })
                      }
                    >
                      Xem chi tiết
                    </button>{" "}
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

export default PostPending;
