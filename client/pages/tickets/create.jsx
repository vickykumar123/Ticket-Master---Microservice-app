import {useState} from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
import {Tag, DollarSign} from "lucide-react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const {doRequest, errors} = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {title, price},
    onSuccess: () => Router.push("/"),
  });

  const onBlur = () => {
    const value = parseFloat(price);
    if (!isNaN(value)) {
      setPrice(value.toFixed(2));
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create a Ticket</h2>
      <form onSubmit={onSubmit} className="p-4 shadow-sm rounded bg-light">
        <div className="form-group mb-3">
          <label className="form-label">Title</label>
          <div className="input-group">
            <span className="input-group-text bg-white border-0">
              <Tag size={18} />
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Enter ticket title"
              required
            />
          </div>
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Price</label>
          <div className="input-group">
            <span className="input-group-text bg-white border-0">
              <DollarSign size={18} />
            </span>
            <input
              type="number"
              value={price}
              onBlur={onBlur}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
              placeholder="Enter price"
              required
            />
          </div>
        </div>
        {errors && <div className="alert alert-danger mt-3">{errors}</div>}
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}
