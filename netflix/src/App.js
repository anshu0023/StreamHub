import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import Body from "./components/Body";
import { Toaster } from "react-hot-toast";
import MovieDialog from "./components/MovieDialog";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(setUser(user));
    }
  }, []);

  return (
    <div>
      <Body />
      <Toaster />
      <MovieDialog />
    </div>
  );
}

export default App;
