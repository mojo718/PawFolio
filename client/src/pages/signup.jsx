import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { CREATE_OWNER } from '../utils/mutations';

import Auth from '../utils/auth';
import "./signup.css";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addOwner, { error, data }] = useMutation(CREATE_OWNER);

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
    } catch (e) {
      console.error(e);
    }
  };

  // Placeholder Form for Sign Up
  return (
  <main className="main" style={{ minHeight: "100vh", minWidth: "100vh" }}>
  <div className="ui grid" style={{ minHeight: "100vh", minWidth: "100vh" }}>
    <div className="left floated seven wide column">
      <h4 className="header">Welcome!</h4>
      <div className="description">
        <p class="text">We are glad you are here! Please sign up to continue.</p>
      </div>
    </div>
    <div className="right floated seven wide column">
      <h4 className="header">Sign Up</h4>
      <div className="description">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form className="ui form" onSubmit={handleFormSubmit}>
                <div className="field">
                <label class="label">Username</label>
                <div class="ui left icon input">
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                <i class="user icon"></i>
                </div>
                </div>

                <div className="field">
                <label class="label">Email</label>
                <div class="ui left icon input">
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <i class="envelope icon"></i>
                </div>
                </div>

                <div className="field">
                <label class="label">Password</label>
          <div class="ui left icon input">
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                 <i class="lock icon"></i>
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
    </main>
  );
};

export default Signup;