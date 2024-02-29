import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { SignInSchema } from "../../schemas/signin.schema";

const ChangePass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = (data) => {
    axios
      .put("http://localhost:3003/users/update-password", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert("Đổi mật khẩu thành công");
        setTimeout(function () {
          window.location.reload();
        }, 10);
      })
      .catch((err) => {
        const msgErr = err.response.data.message;
        alert(msgErr);
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
          display: "flex",

          marginTop: "10px",
          width: "60%",
        }}
      >
        <div
          className="card-body"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <form
            className="row g-3"
            style={{ margin: "auto" }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <h4 style={{ marginBottom: "15px" }}>Đổi mật khẩu</h4>
            <div data-mdb-input-init className="form mb-4">
              <label className="form-label" for="email">
                Mật khẩu cũ
              </label>
              <input
                {...register("oldPass")}
                type="password"
                id="email"
                name="oldPass"
                className="form-control"
              />
            </div>

            <div data-mdb-input-init className="form mb-4">
              <label className="form-label" for="password">
                Mật khẩu mới
              </label>
              <input
                {...register("newPass")}
                type="password"
                id="password"
                name="newPass"
                className="form-control"
              />
            </div>
            <button
              data-mdb-ripple-init
              type="submit"
              className="btn btn-primary btn-block"
            >
              Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
