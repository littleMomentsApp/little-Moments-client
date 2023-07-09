import { MDBFooter } from "mdb-react-ui-kit";
import { ThemeContext } from "../context/theme.context";
import { useContext } from "react";

function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={"Footer " + theme}>
      <MDBFooter className="text-center">
        <div className="text-center p-3">
          <p>
            © 2023 Copyright:
            <a
              className="text-dark"
              href="/"
              style={{ textDecoration: "none", marginLeft: "10px" }}
            >
              LittleMomentsApp
            </a>
          </p>
        </div>
      </MDBFooter>
    </div>
  );
}

export default Footer;
