import {useEffect} from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

export default () => {
  const {doRequest} = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5>Signing you out...</h5>
      </div>
    </div>
  );
};
