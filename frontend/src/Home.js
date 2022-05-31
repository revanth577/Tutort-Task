import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
function Home() {
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.isAuthenticated == "false") {
      navigate("/home");
    }
  }, []);

  const logout = () => {
    setCookie("email", "");
    setCookie("isAuthenticated", false);
    navigate("/login");
  };

  return (
    <div>
      <div>Home</div>

      <div className="logout" onClick={logout}>
        Logout
      </div>
    </div>
  );
}

export default Home;
