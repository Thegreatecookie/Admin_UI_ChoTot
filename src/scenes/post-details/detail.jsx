import React, { useEffect, useRef, useState } from "react";
import { POSTAPI } from "../../services";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import BusinessIcon from "@mui/icons-material/Business";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "../../schemas/signin.schema";
import { socket } from "../../socket";
function PostDetail() {
  const [post, setPost] = useState([]);
  const [image, setImage] = useState([]);
  const [user, setUser] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [objCategory, setObjCategory] = useState(null);
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const {
    state: { id },
  } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });
  const DetailPost = ({ objCategory }) => {
    return (
      <>
        {Object.keys(objCategory).map((key) => (
          <div key={key} className="col-6">
            <span>{mapCategoryToDisplayName(key)}</span>: {objCategory[key]}
          </div>
        ))}
      </>
    );
  };
  const mapCategoryToDisplayName = (category) => {
    switch (category) {
      case "typePost":
        return "Loại tin đăng ";
      case "condition":
        return "Tình trạng ";
      case "brand":
        return "Hãng ";
      case "model":
        return "Mẫu ";
      case "origin":
        return "Xuất xứ ";
      case "registerYear":
        return "Năm đăng ký ";
      case "type":
        return "Loại ";
      case "traveled":
        return "Đã di chuyển(km)";
      // case'' :
      // return '';
      // case'' :
      // return '';
      // case'' :
      // return '';
      // case'' :
      // return '';
      // case'' :
      // return '';
      default:
        return category;
    }
  };
  const Carousel = ({ items }) => {
    const handlePrev = () => {
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? items.length - 1 : prevIndex - 1
      );
    };
    const handleNext = () => {
      setActiveIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    };
    return (
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {items?.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === activeIndex ? "active" : ""
              }`}
            >
              <img
                src={"http://localhost:3003/uploads/" + item}
                alt={`Slide ${index}`}
                style={{
                  objectFit: "scale-down",
                  objectPosition: "center",
                  height: "22rem",
                  width: "80%",
                }}
              />
            </div>
          ))}
          <a
            class="carousel-control-prev"
            role="button"
            data-slide="prev"
            style={{
              backgroundColor: "#808080",
              width: "10%",
            }}
            onClick={handlePrev}
          >
            <span class="carousel-control" aria-hidden="true"></span>
            <span class="sr-only">Trước</span>
          </a>
          <a
            class="carousel-control-next"
            role="button"
            data-slide="next"
            style={{
              backgroundColor: "#808080",
              width: "10%",
            }}
            onClick={handleNext}
          >
            <span class="carousel-control" aria-hidden="true"></span>
            <span class="sr-only">Sau</span>
          </a>
        </div>
      </div>
    );
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3003/posts/id/?postID=${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setImage(res?.data.post.image_path);
        setPost(res?.data.post);
        setUser(res?.data.user);
        setObjCategory(res?.data.post.detailsPost);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, []);
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(value);
  };
  const changeStatus = async (postId, value, title, message) => {
    console.log(postId, title, value, message);
    if (value === "approved") {
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
            socket.emit("receivedEmitNotify", `${title} đã được Duyệt `);
            alert("Duyệt thành công");
            navigate(-1);
          });
      } catch (error) {
        console.error("Error hiding post:", error);
      }
    } else if (value === "rejected") {
      try {
        axios
          .put(
            `http://localhost:3003/posts/change-status/`,
            {
              postID: postId,
              status: value,
              reason: message,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            socket.emit("receivedEmitNotify", `${title} bị Từ chối`);
            alert("Từ chối thành công");
            navigate(-1);
          })
          .catch((err) => {
            const msgErr = err.response.data.message;
            alert(msgErr);
          });
      } catch (error) {
        console.error("Error hiding post:", error);
      }
    }
  };
  // const onSubmit = (data) => {
  //   data.tile = post.title;
  //   console.log(data.title)
  //   data.status = "rejected";
  //   data.postID = post?._id;
  //   console.log("submit", data);
  //   axios
  //     .put(`http://localhost:3003/posts/change-status/`, data, {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     })
  //     .then((res) => {
  //       socket.emit("receivedEmitNotify", `${data.title} bị Từ chối`);
  //       alert("Từ chối thành công");
  //       navigate(-1);
  //     })
  //     .catch((err) => {
  //       const msgErr = err.response.data.message;
  //       alert(msgErr);
  //     });
  // };
  return (
    <div className="body">
      <div
        class="container text-center"
        style={{ marginTop: "10px", width: "80%" }}
      >
        <div class="row">
          <div class="col-9">
            <div class="card">
              <Carousel items={image} />
              <div class="card-body text-start">
                <h4 class="card-title mt-3">{post?.title}</h4>
                <h5 class="card-title text-danger mb-3">
                  {formatCurrency(post?.price)}
                </h5>
                <h5>Mô tả </h5>
                <p class="card-text">{post?.description}</p>
                <div class="row gy-2">
                  <h5>Thông tin sản phẩm </h5>
                  {objCategory ? (
                    <DetailPost objCategory={objCategory} />
                  ) : (
                    <p>Loading...</p>
                  )}
                  {
                    <div className="col-6">
                      <span>
                        Địa chỉ bán: {post?.address?.street},{" "}
                        {post?.address?.district}, {post?.address?.city}
                      </span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="card">
              <ul class="list-group list-group-flush text-start">
                <li class="list-group-item">
                  <div class="d-flex gap-3 align-items-center">
                    <AccountCircleIcon />
                    <span>
                      <span>{user?.firstName + " " + user?.lastName}</span>
                    </span>
                    {/* <button class="btn btn-info">Xem</button> */}
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="d-flex gap-3 align-items-center">
                    <StorefrontIcon />
                    <span>{user?.role}</span>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="d-flex gap-3 align-items-center">
                    <PhoneAndroidIcon />
                    <span>{user?.phone}</span>
                  </div>
                </li>

                <li class="list-group-item">
                  <div class="d-flex gap-3 align-items-center">
                    <BusinessIcon />
                    <span>
                      {user?.address?.street +
                        " " +
                        user?.address?.district +
                        " " +
                        user?.address?.city}
                    </span>
                  </div>
                </li>
                <li class="list-group-item" hidden={show}>
                  {/* <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <label htmlFor="Textarea" className="form-label">
                      Lý do<span className="text-danger"> *</span>
                    </label>
                    <textarea
                      {...register("reason")}
                      className="form-control"
                      placeholder="Nhập ý do"
                      id="Textarea"
                      name="reason"
                    ></textarea>
                    <button type="submit" className="btn btn-info">
                      Gửi
                    </button>
                  </form> */}
                  <label htmlFor="Textarea" className="form-label">
                    Lý do<span className="text-danger"> *</span>
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Nhập lý do"
                    id="Textarea"
                    name="reason"
                    onChange={(x) => setMessage(x.target.value)}
                  ></textarea>
                  <button
                    type="submit"
                    className="btn btn-info"
                    onClick={() =>
                      changeStatus(post?._id, "rejected", post.title, message)
                    }
                  >
                    Gửi
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
