import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import { useMutation } from '@apollo/client';
import { CREATE_OWNER } from '../utils/mutations';

import Auth from '../utils/auth';
import "./signup.css";
import Footer from "../components/footer.jsx";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addOwner, { error, data }] = useMutation(CREATE_OWNER);
  const navigate = useNavigate();  // Initialize useNavigate

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

    try {
      const { data } = await addOwner({
        variables: { ...formState },
      });

      Auth.login(data.createOwner.token);
      navigate('/profile', { state: { owner: data.createOwner.owner, pet: data.createOwner.owner.pet } });  // Redirect to Profile with data
    } catch (e) {
      console.error(e);
    }
  };

  // Placeholder Form for Sign Up
  return (
    <main className="main" style={{ minHeight: "100vh", minWidth: "100vh" }}>
      <div className="ui grid" style={{ minHeight: "100vh", minWidth: "100vh" }}>
        <div className="left floated seven wide column">
          <h1 className='head'>Welcome!</h1>
          <div className="description">
            <p className="text">We are glad you are here! Please sign up to continue.</p>
          </div>
        </div>
        <div className="right floated seven wide column">
          <h4 className='head'>Sign Up</h4>
          <div className="description">
            {data ? (
              <p>
                Success!
                <Link to="/profile">Go to Profile</Link>
              </p>
            ) : (
              <form className="ui form" onSubmit={handleFormSubmit}>
                <div className="field">
                <label className="label">Username</label>
                <div className="ui left icon input">
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                <i className="user icon"></i>
                </div>
                </div>

                <div className="field">
                <label className="label">Email</label>
                <div className="ui left icon input">
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <i className="envelope icon"></i>
                </div>
                </div>

                <div className="field">
                <label className="label">Password</label>
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
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}
          </div>

          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Signup;
