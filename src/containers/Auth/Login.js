import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handldLoginApi } from "../../services/userService";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string()
    // .min(8, "Mật khẩu phải có ít nhất 3 ký tự")
    // .matches(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ cái viết hoa")
    // .matches(/[a-z]/, "Mật khẩu phải có ít nhất một chữ cái viết thường")
    // .matches(/[0-9]/, "Mật khẩu phải có ít nhất một chữ số")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Mật khẩu phải có ít nhất một ký tự đặc biệt"
    )
    .required("Mật khẩu là bắt buộc"),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassowrd: false,
      errMessage: "",
    };
  }

  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handldLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handldLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      this.handldLogin();
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassowrd: !this.state.isShowPassowrd,
    });
  };

  render() {
    // JSX
    return (
      <div className="login-background">
        <div className="login-container">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <div className="login-content">
                <div className="col-12 text-login">Login</div>
                <div className="col-12 form-group login-input">
                  <lable>Username:</lable>
                  <input
                    placeholder="Enter your username..."
                    type="text"
                    className="form-control"
                    value={this.state.username}
                    onChange={(event) => this.handleOnChangeUsername(event)}
                    name="email"
                    onBlur={handleBlur}
                  />
                  {errors.email && (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  )}
                </div>
                <div className="col-12 form-group login-input">
                  <lable>Password:</lable>
                  <div className="custom-input-password">
                    <input
                      className="form-control"
                      placeholder="Enter your password..."
                      type={this.state.isShowPassowrd ? "text" : "password"}
                      value={this.state.password}
                      onChange={(event) => this.handleOnChangePassword(event)}
                      onKeyDown={(e) => this.handleKeyDown(e)}
                      onBlur={handleBlur}
                    />
                    {errors.password && (
                      <div style={{ color: "red" }}>{errors.password}</div>
                    )}
                    <span
                      onClick={() => {
                        this.handleShowHidePassword();
                      }}
                    >
                      <i
                        className={
                          this.state.isShowPassowrd
                            ? "far fa-eye"
                            : "far fa-eye-slash"
                        }
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="col-12" style={{ color: "red" }}>
                  {this.state.errMessage}
                </div>
                <div className="col-12">
                  <button
                    onClick={() => {
                      this.handldLogin();
                    }}
                    className="btn-login"
                  >
                    Login
                  </button>
                </div>
                <div className="col-12">
                  <span className="forgot-password"></span>
                  <Link className="forgot-password" to="/ForgotPassWord">
                    Forgot your password?
                  </Link>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
