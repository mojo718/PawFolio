import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";
import "./login.css";

const Login = () => {
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
      navigate('/profile', { state: { owner: data.createOwner.owner, pet: data.createOwner.owner.pet } });
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
    <main className="main" style={{ minHeight: "100vh", minWidth: "100vh" }}>
      <div className="ui grid" style={{ minHeight: "100vh", minWidth: "100vh" }}>
        <div className="left floated seven wide column">
          {/* <div className="ui two column very relaxed grid">
          <div className="column"> */}
          {/* <div className="content"> */}
          <h4 className="header">Welcome Back!</h4>
          <div className="description">
            <p class="text">We are glad to see you again! Please log in to continue.</p>
          </div>
          {/* </div> */}
        </div>
        <div className="right floated seven wide column">
          {/* <div className="column">
          <div className="content"> */}
          <h4 className="header">Login</h4>
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
                <div class="ui left icon input">
                  <input
                    className="form-input"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <i class="envelope icon"></i>
                </div>
                </div>
                
                <div className="field">
                <label>Password</label>
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
                <button className="ui button primary" type="submit">
                  Submit
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
      </div>
      {/* <div class="ui vertical divider"></div> */}
    </main>
  );
};

export default Login;

//   return (
//     <main className="flex-row justify-center mb-4">
//       <div className="col-12 col-lg-10">
//         <div className="card">
//           <h4 className="card-header bg-dark text-light p-2">Login</h4>
//           <div className="card-body">
//             {data ? (
//               <p>
//                 Success! You may now head{' '}
//                 <Link to="/">back to the homepage.</Link>
//               </p>
//             ) : (
//               <form onSubmit={handleFormSubmit}>
//                 <input
//                   className="form-input"
//                   placeholder="Your email"
//                   name="email"
//                   type="email"
//                   value={formState.email}
//                   onChange={handleChange}
//                 />
//                 <input
//                   className="form-input"
//                   placeholder="******"
//                   name="password"
//                   type="password"
//                   value={formState.password}
//                   onChange={handleChange}
//                 />
//                 <button
//                   className="btn btn-block btn-primary"
//                   style={{ cursor: 'pointer' }}
//                   type="submit"
//                 >
//                   Submit
//                 </button>
//               </form>
//             )}

//             {error && (
//               <div className="my-3 p-3 bg-danger text-white">
//                 {error.message}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Login;
