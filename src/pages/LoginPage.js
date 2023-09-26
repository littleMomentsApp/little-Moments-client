import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";

const baseUrl = process.env.REACT_APP_SERVER_URL || "/";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${baseUrl}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT Token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="login">
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-blue text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase text-black">
                  Login
                </h2>
                <p className="text-black-50 mb-5">
                  Please enter your login and password!
                </p>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-black"
                  label="Email address"
                  id="formControlLg1"
                  type="email"
                  size="lg"
                  placeholder="Enter Email"
                  value={email}
                  onChange={handleEmail}
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-black"
                  label="Password"
                  id="formControlLg2"
                  type="password"
                  size="lg"
                  placeholder="Enter Password"
                  value={password}
                  onChange={handlePassword}
                />

                <p className="small mb-3 pb-lg-2">
                  <a className="text-black-50" href="#!">
                    Forgot password?
                  </a>
                </p>
                <Button variant="info" onClick={handleLoginSubmit}>
                  Login
                </Button>
                <div>
                  <p className="mb-0 text-black">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-black-50 fw-bold">
                      Sign Up
                    </a>
                  </p>
                  {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                  )}
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default LoginPage;
