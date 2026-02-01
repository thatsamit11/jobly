import { useSearchParams } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [params] = useSearchParams();
  const mode = params.get("mode");
  const role = params.get("role");

  return (
    <>
      {mode === "register" ? (
        <Register role={role} />
      ) : (
        <Login role={role} />
      )}
    </>
  );
};

export default Auth;
