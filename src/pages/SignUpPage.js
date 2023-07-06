import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";

const baseUrl = process.env.REACT_APP_SERVER_URL || "/";

function SignUpPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };

    axios
      .post(`${baseUrl}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className={"SignupPage "}>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-blue text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase text-black">
                  Sign Up
                </h2>
                <br />
                <br />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-black"
                  label="Email address"
                  id="formControlLg"
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
                  id="formControlLg"
                  type="password"
                  size="lg"
                  placeholder="Enter Password"
                  value={password}
                  onChange={handlePassword}
                />

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-black"
                  label="Name"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={handleName}
                />

                <Button variant="info" onClick={handleSignupSubmit}>
                  Sign Up
                </Button>
                <br />
                <br />
                <div>
                  <p className="mb-0 text-black">
                    Already have an account?
                    <a href="/login" class="text-black-50 fw-bold">
                      Login
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

export default SignUpPage;
