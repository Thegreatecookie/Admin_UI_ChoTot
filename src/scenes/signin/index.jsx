import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect } from "react";
import { SignInSchema } from "../../schemas/signin.schema";
import { FormHelperText } from "@mui/joy";
const Signin = () => {
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
      .post("http://localhost:3003/auth/admin/signin", data)
      .then((response) => {
        console.log("RESPONSE", response);

        if (response.data.access_token) {
          localStorage.setItem("token", response.data.access_token);
          axios
            .get("http://localhost:3003/auth/profile", {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((response) => {
              // console.log("RESPONSE1", response);
              localStorage.setItem("role", response.data.role);
              localStorage.setItem("id", response.data.id);
              alert("Đăng nhập thành công");
              return navigate("/home");
            });
        }
      })
      .catch((err) => {
        console.log("ERR", err.response.data.message);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(-1);
    }
  }, []);

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
          marginTop: "10%",
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
            <h4 style={{ marginBottom: "15px" }}>Đăng nhập</h4>
            <div data-mdb-input-init className="form mb-4">
              <label className="form-label" for="email">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                name="email"
                className="form-control"
              />
            </div>

            <div data-mdb-input-init className="form mb-4">
              <label className="form-label" for="password">
                Mật khẩu
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                name="password"
                className="form-control"
              />
            </div>
            {/* <FormHelperText>{errors?.role?.message}</FormHelperText> */}
            <button
              // data-mdb-ripple-init
              type="submit"
              className="btn btn-primary btn-block"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
