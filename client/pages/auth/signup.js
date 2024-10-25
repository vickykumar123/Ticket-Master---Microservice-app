import {useState} from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
import {Mail, Lock} from "lucide-react";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {doRequest, errors} = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-lg-6 col-md-8 col-sm-10 col-12 p-4 shadow-sm rounded bg-light">
        <form onSubmit={onSubmit}>
          <h2 className="text-center mb-4" style={{color: "#333"}}>
            Sign Up
          </h2>
          <div className="form-group mb-3 position-relative">
            <label className="form-label">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-0">
                <Mail size={18} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="form-group mb-3 position-relative">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-0">
                <Lock size={18} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Create a password"
                required
              />
            </div>
          </div>
          {errors && <div className="alert alert-danger">{errors}</div>}
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
