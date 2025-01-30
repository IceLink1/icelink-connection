import MainRouter from "./routes/MainRouter";
import Navbar from "./components/Navbar/Navbar";
import "./styles/App.css";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { check } from "./store/reducers/AuthReducers/AuthActions";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (cookies.token) {
      dispatch(check(cookies.token))
    }
  }, [isAuth]);
  return (
    <main>
      <Navbar />
      <MainRouter />
      <Footer />
    </main>
  );
}

export default App;
