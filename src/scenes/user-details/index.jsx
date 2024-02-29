import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { PhoneSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import { ADDRESSAPI } from "../../services";
import { useLocation } from "react-router-dom";
function DetailsUser() {
  const [user, setUser] = useState();
  const [cityList, setCityList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(""),
  });
  const {
    state: { id },
  } = useLocation();
  useEffect(() => {
    axios
      .get(`http://localhost:3003/users/id?id=${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res?.data);
        setValue("firstName", res.data?.firstName);
        // setFirstName(res?.data.firstName);
        setValue("lastName", res.data?.lastName);
        setValue("phone", res.data?.phone);
        setValue("CCID", res.data?.CCID);
        setValue("address.street", res.data?.address.street);
        setValue("address.city", res.data?.address.city);
        setValue("address.district", res.data?.address.district);
        setValue("dateOfBirth", res.data?.dateOfBirth.split("T")[0]);
        setValue("email", res.data?.email);
        setValue("gender", res.data?.gender);
        axios
          .get("http://localhost:3003/district", {
            params: {
              name: res.data?.address.city,
            },
          })
          .then((res) => {
            fetchDistricts(res.data[0]?.id);
          })
          .catch((err) => {
            console.log(err.response.data.message, "ERR");
          });
      });
    ADDRESSAPI.Province()
      .then((res) => {
        setCityList(res);
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
      });
  }, []);

  const fetchDistricts = (cityId) => {
    axios
      .get("http://localhost:3003/districts", {
        params: {
          province: cityId,
        },
      })
      .then((res) => {
        const districts =
          res?.data?.map((districtItem) => {
            const value = districtItem.value;
            const label = districtItem.label;
            return { ...districtItem, label, value };
          }) ?? [];
        setDistrictsList(districts);
      })
      .catch((err) => {
        console.log(err.response.data.message, "ERR");
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
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          width: "60%",
        }}
      >
        <div
          className="card-body"
          style={{
            display: "flex",
          }}
        >
          <form className="row g-3" style={{ margin: "auto", width: "90%" }}>
            <h4 style={{ marginBottom: "15px" }}>Thông tin cá nhân</h4>
            <div className="col-6">
              <label htmlFor="inputFirstName">Họ</label>
              <input
                {...register("firstName")}
                type="text"
                className="form-control"
                id="inputFirstName"
                placeholder="Họ"
                name="firstName"
                disabled
              ></input>
            </div>
            <div className="col-6">
              <label htmlFor="inputLastName">Tên</label>
              <input
                {...register("lastName")}
                type="text"
                className="form-control"
                id="inputLastName"
                placeholder="Tên"
                name="lastName"
                disabled
              ></input>
            </div>
            <div className="col-12">
              <label htmlFor="inputEmail">Email</label>
              <input
                {...register("email")}
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                name="email"
                disabled
              />
            </div>

            <div className="col-12">
              <label htmlFor="inputPhoneNumber">Số điện thoại</label>
              <input
                {...register("phone")}
                type="text"
                className="form-control"
                id="inputPhoneNumber"
                placeholder="Số điện thoại"
                name="phone"
                disabled
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputCCID">Căn cước công dân</label>
              <input
                {...register("CCID")}
                type="text"
                className="form-control"
                id="inputCCID"
                placeholder="Căn cước công dân"
                name="CCID"
                disabled
              />
            </div>
            <div className="col-6">
              {" "}
              <div className="col-12">
                <label>Ngày sinh</label>
              </div>
              <div className="col-12">
                <input
                  {...register("dateOfBirth")}
                  type="date"
                  id="birthday"
                  name="dateOfBirth"
                  min={new Date(
                    Date.now() - 1000 * 60 * 60 * 24 * 365 * 70
                  ).toLocaleDateString("en-ca")}
                  max={new Date(
                    Date.now() - 1000 * 60 * 60 * 24 * 365 * 18
                  ).toLocaleDateString("en-ca")}
                  disabled
                />
              </div>
            </div>
            <div className="col-6">
              <label htmlFor="inputGender">Giới tính</label>
              <select
                {...register("gender")}
                className="form-select"
                id="inputGender"
                disabled
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="inputCity">Thành phố</label>
              <select
                {...register("address.city")}
                id="inputCity"
                className="form-select"
                name="address.city"
                disabled
              >
                <option selected hidden value={user?.address.city}>
                  {user?.address.city}
                </option>
                {cityList?.map((i) => (
                  <option key={i._id} value={i.label} data-extra-info={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="inputDistrict">Quận</label>
              <select
                {...register("address.district")}
                id="inputDistrict"
                className="form-select"
                name="address.district"
                disabled
              >
                {/* <option selected hidden value={user?.address.district}>
              {user?.address.district}
            </option> */}
                {districtsList?.map((i, index) => {
                  let flag = false;
                  if (user?.address.district === i.label) {
                    flag = true;
                    return (
                      <option selected hidden value={i.label}>
                        {i.label}
                      </option>
                    );
                  }
                  return (
                    <>
                      {/* {!flag && <option selected hidden></option>} */}
                      <option hidden></option>
                      <option
                        key={i.label}
                        value={i.label}
                        data-extra-info={i.value}
                      >
                        {i.label}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="inputAddress">Địa chỉ nhà</label>
              <input
                {...register("address.street")}
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                name="address.street"
                disabled
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DetailsUser;
