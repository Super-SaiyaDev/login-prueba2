import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";
import { BiCoffeeTogo } from "react-icons/bi";
import "./css/login.css";
import axios from "axios";

const Login = () => {
  //? creatingn the usestate
  const [value, stateValues] = useState({
    user: "",
    clave: "",
    name: "",
  });
  //? creating the usenavigate
  const navigate = useNavigate();

  //? this is the handleSumit or manager of menssage.
  const handleSumit = (e) => {
    e.preventDefault();
    console.log(value);
    axios
      .post("http://localhost:3000/register", value)
      .then((res) => {
        if (value.clave != "" && value.user != "" && value.name != "") {
          if (res.data.Status != "Success") {
            navigate("/register");
            alert("no se creo");
          } else {
            navigate("/");
          }
        } else {
          alert("rellene todos los campos");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container">
        <form action="" onSubmit={handleSumit}>
          <div className="input-group">
            <span className="icon">
              <BiCoffeeTogo />
              <span className="logo">Json Coffe</span>
            </span>

            <h1>Sigin in the system</h1>

            <div className="other-logins">
              <a className="google" href="#">
                <FaGoogle />
                <span className="logo-span">Continue with Google</span>
              </a>
              <a className="instagram" href="#">
                <FaInstagram />
                <span className="logo-span">Continue with Instagram</span>
              </a>

              <a className="facebook" href="#">
                <FaFacebook />
                <span className="logo-span">Continue with Facebook</span>
              </a>
            </div>

            <hr />

            <div className="or">
              <span>or</span>
            </div>

            <div className="input-feild">
              <input
                type="text"
                name="name"
                autoComplete="off"
                onChange={(e) =>
                  stateValues({ ...value, name: e.target.value })
                }
              />
              <label htmlFor="">Name</label>
            </div>

            <div className="input-feild">
              <input
                type="text"
                name="username"
                autoComplete="off"
                onChange={(e) =>
                  stateValues({ ...value, user: e.target.value })
                }
              />
              <label htmlFor="">username</label>
            </div>

            <div className="input-feild">
              <input
                type="password"
                name="password"
                required
                autoComplete="off"
                onChange={(e) =>
                  stateValues({ ...value, clave: e.target.value })
                }
              />
              <label htmlFor="">Password</label>
            </div>
            <div className="button">
              <button>Log In</button>
              <Link className="link-router" to="/login">
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
