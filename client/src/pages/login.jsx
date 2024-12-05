import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";
import "./login.css";
// import Footer from "../components/footer.jsx";
import tempLogo from '../assets/Pawfolio1.png'


const Login = () => {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      // navigate('/profile', { state: { owner: data.createOwner.owner, pet: data.createOwner.owner.pet } });
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="main">

{/* Removed from line 49 -  style={{ minHeight: "100vh", minWidth: "100vh" }} to fix footer */}

      {/* <div className="ui grid" style={{ minHeight: "100vh", minWidth: "100vh" }}> */}
        <div className="left floated seven wide column">

        <div className="logo">
                <img src={tempLogo} alt="Logo" />
            </div>

          {/* <div className="ui two column very relaxed grid">
          <div className="column"> */}
          {/* <div className="content"> */}
          {/* <h4 className="head">Welcome Back!</h4> */}
          {/* <div className="description"> */}
            {/* <p className="text">We are glad to see you again! Please log in to continue.</p> */}
          {/* </div> */}
          {/* </div> */}
        </div>
        <div className="right floated seven wide column">
          {/* <div className="column">
          <div className="content"> */}
          <h4 className="head1">Welcome Back!</h4>
          <h5 className="tag">Login to continue</h5>
          <div className="description">
            {data ? (
              <p>
                Success!
                <Link to="/profile">Go to Profile</Link>
              </p>
            ) : (
              <form className="ui form" onSubmit={handleFormSubmit}>
                <div className="field">
                <label>Email</label>
                <div className="ui left icon input">
                  <input
                    className="form-input"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <i className="envelope icon"></i>
                </div>
                </div>
                
                <div className="field">
                <label>Password</label>
          <div className="ui left icon input">
                  <input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <i className="lock icon"></i>
                </div>
                </div>
                <button className="ui button primary" type="submit">
                  Login
                </button>
              </form>
            )}

            {error && (
              <div className="ui message negative">
                <div className="header">Error</div>
                <p>{error.message}</p>
              </div>
            )}
          </div>
        </div>
      {/* </div> */}
      {/* <div className="ui vertical divider"></div> */}
      {/* <Footer /> */}
    </main>
  );
};

export default Login;


// ownerProfile.css has all of the form css. Need to  adjust to remove dic color on form on log in / sign up page