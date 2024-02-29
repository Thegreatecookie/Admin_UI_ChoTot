import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect } from "react";
import { SignInSchema } from "../../schemas/signin.schema";
const AddCategory = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = (data) => {
    console.log(data, "DATA");
    axios
      .post("http://localhost:3003/categories/create", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert("Tạo danh mục thành công");
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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="card"
        style={{
          marginTop: "10px",
          width: "60%",
        }}
      >
        <div class="card-body">
          <form
            className="row g-3"
            style={{ margin: "auto" }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <h4 style={{ marginBottom: "15px" }}>Thêm danh mục</h4>
            <div data-mdb-input-init className="form mb-4">
              <label className="form-label" for="name">
                Tên danh mục
              </label>
              <input
                {...register("name")}
                type="text"
                id="text"
                name="name"
                className="form-control"
                placeholder="Nhập tên danh mục"
              />
            </div>

            <div data-mdb-input-init className="form mb-4">
              <label className="form-label" for="slug">
                Slug
              </label>
              <input
                {...register("slug")}
                type="text"
                id="slug"
                name="slug"
                className="form-control"
                placeholder="Nhập slug"
              />
            </div>

            <button
              // data-mdb-ripple-init
              type="submit"
              className="btn btn-primary btn-block"
            >
              Tạo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
