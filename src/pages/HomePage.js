import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";


function HomePage() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={"HomePage " + theme}>
    </div>
  );
}

export default HomePage;
