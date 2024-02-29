import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import "moment/locale/vi";


function PostManage() {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const time = (date) => {
    return <td>{moment(date).fromNow()}</td>;
  };
  moment.locale("vi");
  const changeStatus = async (postId, value) => {
    try {
      await axios
        .put(
          `http://localhost:3003/posts/change-status/`,
          {
            postID: postId,
            status: value,
          },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setTimeout(function () {
            window.location.reload();
          }, 10);
        })
        .catch((err) => {
          console.log(err.response.data.message, "ERR");
        });
    } catch (error) {
      console.error("Error hiding post:", error);
    }
  };
 
  const transformStatus = (status) => {
    switch (status) {
      case "pending":
        return "Đang chờ";
      case "approved":
        return "Đang hiển thị";
      case "rejected":
        return "Từ chối";
      case "hidden":
        return "Ẩn";
      case "expired":
        return "Hết hạn";
      // Thêm các trường hợp khác nếu cần thiết
      default:
        return status;
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:3003/posts/staff/status?status=approved", {
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
                Thời gian duyệt
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
                  {time(i.approvedAt)}
                  <td>
                    {" "}
                    <button
                      className="btn btn-info"
                      onClick={() =>
                        navigate(ROUTE_PATH.POST_DETAIL, {
                          state: { id: i._id },
                        })
                      }
                    >
                      Xem chi tiết
                    </button>{" "}
                    <button
                      className="btn btn-success"
                      onClick={() => changeStatus(i?._id, "hidden")}
                    >
                      Ẩn
                    </button>{" "}
                  </td>
                </tr>
              ))
            ) : (
              <p>Không có tin đăng đang hiển thị</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PostManage;
