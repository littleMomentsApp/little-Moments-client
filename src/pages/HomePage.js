import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";

function HomePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={"HomePage " + theme}>
      {
        (isLoggedIn,
        user ? (
          <h1> Welcome {user.name}</h1>
        ) : (
          <h1>Enjoy the Little Moments...</h1>
        ))
      }
    </div>
  );
}

export default HomePage;
