import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';

import './Login.scss';
import { forgotPasswordAPI, handldLoginApi } from '../../services/userService';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
});

class ForgotPassWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      status: false,
    };
  }

  handleOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleForgotPassword = async () => {
    console.log(this.state.email);
    try {
      let data = await forgotPasswordAPI({
        email: this.state.email,
      });
      if (data && data.errCode === 200) {
        this.setState({
          status: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response && error.response.data) {
        toast.error(error?.response?.data?.errMessage);
      }
    }
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      this.handleForgotPassword();
    }
  };

  render() {
    // JSX
    return (
      <div className="login-background">
        <div className="login-container">
          {this.state.status ? (
            <div className='login-success'>
              <h2>Bạn đã cập nhật lại mật khẩu thành công!</h2>
              <p>Vui lòng kiểm tra thông tin ở email</p>
            </div>
          ) : (
            <Formik initialValues={{ email: '' }} validationSchema={validationSchema}>
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <div className="login-content">
                  <div className="col-12 text-login" style={{ fontSize: '30px', marginBottom: '80px' }}>
                    Forgot your password?
                  </div>
                  <div className="col-12 form-group login-input">
                    {/* <lable>Quên Mật Khẩu</lable> */}
                    <input
                      placeholder="Enter your Email..."
                      type="text"
                      className="form-control"
                      value={this.state.email}
                      onChange={(event) => this.handleOnchangeEmail(event)}
                      name="email"
                      onBlur={handleBlur}
                      onKeyDown={(e) => this.handleKeyDown(e)}
                    />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                  </div>
                  <div className="col-12">
                    <button
                      onClick={() => {
                        this.handleForgotPassword();
                      }}
                      className="btn-login"
                    >
                      Gửi Lại Mật Khẩu
                    </button>
                  </div>
                </div>
              )}
            </Formik>
          )}
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
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassWord);
