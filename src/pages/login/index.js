import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Breadcrumb from "../../components/breadcrumb";
import useApi from "../../hooks/useApi";
import { setToken, setAuthCustomerName } from "../../redux/authSlice";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const api = useApi();
  const dispatch = useDispatch();

  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Login",
      href: "/auth/login",
    },
  ];

  const onFormSubmit = (event) => {
    event.preventDefault();
    //alert("form submit click");
    const postData = { email, password };

    api
      .post("shop/authentication-token", postData)
      .then((response) => {
        console.log(">> Response Post Login Data", response);
        // dispatch to setToken reducer ' ctrl+click setToken then see where it is'
        // action.payload.token    token is a object. Becouse of that we send it setToken({token: response.data.token,}) as object ({})
        dispatch(
          setToken({
            token: response.data.token, // response.data coming from axios and include object token and costumer
          })
        );

        /*
        const customerId = response.data.customer.replace(
          "/api/v2/shop/customers/",
          ""
        );
        console.log(">> CUSTOMER id", customerId);

        api
          .get(`shop/customers/${customerId}`)
          .then((response) => {
            console.log(">>>RESPONSE Customer DATA", response);

            dispatch(
              setAuthCustomerName({
                authCustomerName: response.data.fullName,
              })
            );
          })
          .catch((err) => {
            console.log(">> Error Customer DATA", err);
          });
          */

        document.location.replace("/");
      })
      .catch((err) => {
        console.log(">> Error Post Login Data", err);
        alert("An Error occured" + err);
      });
  };

  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <div className="content">
        <div className="container">
          <div className="box">
            <div className="row">
              <div className="col-lg-offset-1 col-lg-5 col-md-offset-1 col-md-5 col-sm-12 col-xs-12 ">
                <div className="box-body">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-6 col-xs-12 mb20">
                      <h3 className="mb10">Login</h3>
                    </div>

                    <form onSubmit={onFormSubmit}>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label
                            className="control-label sr-only"
                            htmlFor="email"
                          ></label>
                          <div className="login-input">
                            <input
                              type="text"
                              className="form-control"
                              onChange={(event) => setEmail(event.target.value)}
                              placeholder="Enter your email"
                              required
                            />
                            <div className="login-icon">
                              <i className="fa fa-user"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only"></label>
                          <div className="login-input">
                            <input
                              type="password"
                              className="form-control"
                              onChange={(event) =>
                                setPassword(event.target.value)
                              }
                              placeholder="Password"
                              required
                            />
                            <div className="login-icon">
                              <i className="fa fa-lock"></i>
                            </div>
                            <div className="eye-icon">
                              <i className="fa fa-eye"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb20 ">
                        <button className="btn btn-primary btn-block mb10">
                          Login
                        </button>
                        <div>
                          <p>
                            If you don't have an acount <span> </span>
                            <a href="/auth/register">Register</a>
                          </p>
                        </div>
                      </div>
                    </form>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                      <h4 className="mb20">Login With</h4>
                      <div className="social-media">
                        <a
                          href="#"
                          className="btn-social-rectangle btn-facebook"
                        >
                          <i className="fa fa-facebook"></i>
                          <span className="social-text">Facebook</span>
                        </a>
                        <a
                          href="#"
                          className="btn-social-rectangle btn-twitter"
                        >
                          <i className="fa fa-twitter"></i>
                          <span className="social-text">Twitter</span>{" "}
                        </a>
                        <a
                          href="#"
                          className="btn-social-rectangle btn-googleplus"
                        >
                          <i className="fa fa-google-plus"></i>
                          <span className="social-text">Google Plus</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 ">
                <div className="box-body">
                  <div className="feature-left">
                    <div className="feature-icon">
                      <img src="/images/feature_icon_1.png" alt="" />
                    </div>
                    <div className="feature-content">
                      <h4>Loyalty Points</h4>
                      <p>
                        Aenean lacinia dictum risvitae pulvinar disamer
                        seronorem ipusm dolor sit manert.
                      </p>
                    </div>
                  </div>
                  <div className="feature-left">
                    <div className="feature-icon">
                      <img src="/images/feature_icon_2.png" alt="" />
                    </div>
                    <div className="feature-content">
                      <h4>Instant Checkout</h4>
                      <p>
                        Aenean lacinia dictum risvitae pulvinar disamer
                        seronorem ipusm dolor sit manert.
                      </p>
                    </div>
                  </div>
                  <div className="feature-left">
                    <div className="feature-icon">
                      <img src="/images/feature_icon_3.png" alt="" />
                    </div>
                    <div className="feature-content">
                      <h4>Exculsive Offers</h4>
                      <p>
                        Aenean lacinia dictum risvitae pulvinar disamer
                        seronorem ipusm dolor sit manert.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
