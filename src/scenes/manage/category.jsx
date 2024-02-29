import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";
import { Pagination } from "@mui/material";

function CategoryManage() {
  const [category, setCategory] = useState();
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
  const changeStatus = async (categoryID, currentStatus, index) => {
    try {
      await axios
        .put(
          `http://localhost:3003/categories/change-status`,
          {
            id: categoryID,
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
      .get(`http://localhost:3003/categories/all?page=${page || 1}&pageSize=10`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCategory(res?.data?.categories);
        const initialHideArray = res?.data?.categories.map(
          (i) => i.active === false
        );
        setHideArray(initialHideArray);
        setCount(res.data.totalPage);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [page, category]);

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5>Danh sách danh mục</h5>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              navigate(ROUTE_PATH.ADD_CATEGORY);
            }}
          >
            Thêm danh mục
          </button>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Tên danh mục</th>
              <th scope="col">Slug</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {category?.map((i, index) => (
              <tr>
                {" "}
                <th key={index} scope="row">
                  {i.name}
                </th>
                <td>{i.slug}</td>
                <td>{transformStatus(i.active)}</td>
                <td>
                  {" "}
                  <button
                    className="btn btn-success"
                    hidden={!hideArray[index]}
                    onClick={() => {
                      toggleHide(index);
                      changeStatus(i._id, i.active, index);
                    }}
                  >
                    Hiện danh mục
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    hidden={hideArray[index]}
                    onClick={() => {
                      toggleHide(index);
                      changeStatus(i._id, i.active, index);
                    }}
                  >
                    Ẩn danh mục
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

export default CategoryManage;
