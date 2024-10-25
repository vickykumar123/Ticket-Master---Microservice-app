import {useState} from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {doRequest, errors} = useRequest({
    url: "/api/users/signin",
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
      <div className="col-lg-6 col-md-8 col-sm-10 col-12 p-4 shadow-sm rounded bg-white">
        <form onSubmit={onSubmit}>
          <h2 className="text-center mb-4" style={{color: "#333"}}>
            Sign In
          </h2>
          <div className="form-group mb-3">
            <label className="form-label">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </div>
          {errors && <div className="alert alert-danger">{errors}</div>}
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
