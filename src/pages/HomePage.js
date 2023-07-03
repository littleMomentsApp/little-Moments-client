import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <div className="HomePage">
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
