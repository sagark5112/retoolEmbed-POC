import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retoolEmbedUrl, setRetoolEmbedUrl] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  async function attemptedLogin(event) {
    event.preventDefault();
    const loginOptions = {
      method: "POST",
      // headers: { "Access-Control-Allow-Origin": '*', 'Referrer-Policy': 'no-referrer'},
      headers: {
        mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
        Referer: "https://ev4all.retool.com/",
      },
      body: JSON.stringify({ email: email, password: password }),
      mode: "no-cors",
    };
    const data = await fetch(
      "https://ev4all.retool.com/api/login",
      loginOptions
    );
    console.info("data", data);
  }

  async function getData(event) {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer retool_01hqaq70wncs1nmejg27rcq9a1",
        Host: "offertes.ev4all.nl",
        Accept: "*/*",
        Referer: "https://offertes.ev4all.nl/",
      },
      body: JSON.stringify({
        landingPageUuid: "6064f8e6-7802-11ee-b5ef-235b5cc6ea38",
        groupIds: [2426042],
        externalIdentifier:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV2NGFsbEBwbGF0Zm9ybXZpc2lvbnMuY29tIiwibGFzdExvZ2dlZEluIjoxNzA4NTEyNDY3NjE1LCJpZCI6Nzg3NzI3LCJpYXQiOjE3MDkwMzA2OTgsImV4cCI6MTcwOTAzMDk5OH0.jFndDXbWdce1JEHX4CqUTjp8PTElnK-yGEw4tIcuW_0",
      }),
    };
    const data1 = await fetch(
      "https://offertes.ev4all.nl/api/embed-url/external-user",
      options
    );
    console.info("data1", data1);
  }

  async function getWorkflow(event) {
    event.preventDefault();
    setShowLoader(true);
    const callOptions = {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        pageUuid: "6064f8e6-7802-11ee-b5ef-235b5cc6ea38",
      }),
    };
    const data2 = await fetch(
      "https://api.retool.com/v1/workflows/99974e13-a5c9-4062-bf3d-43a4f788f954/startTrigger?workflowApiKey=retool_wk_531699801b7e4f1b9d7144673e7476b5",
      callOptions
    );
    const res = await data2.json();
    setRetoolEmbedUrl(res.embedUrl);
    setShowLoader(false);
    // navigate('/retool', {loadingUrl: retoolEmbedUrl});
    console.info("retoolEmbedUrl", retoolEmbedUrl);
  }
  return (
    <div className="App p-5">
      <div className="container">
        <div className="row">
          <div className="offset-4 col-md-4">
            <div className="h-100 p-5 bg-body-tertiary border rounded-3">
              <form>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                  />
                </div>
                <button
                  onClick={(e) => getWorkflow(e)}
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {retoolEmbedUrl != null && (
        <Navigate to="/retool" state={{ retoolEmbedUrl }} />
      )}

      {showLoader && (
        <div className="loader-overlay">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
