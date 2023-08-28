import { FC, useState } from "react"; // FunctionComponent

const Auth: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // вернется Function Component
  // Authentication (Аутентификация) - true/false
  const [isLogin, setIsLogin] = useState<boolean>(false); // generic: метод принимает значения типа boolean

  return (
    <div className="bg-state-900  mt-40 flex flex-col items-center justify-center text-white">
      <h1 className="mb-10 text-center text-xl">
        {isLogin ? "Login" : "Registration"}
      </h1>
      <form className="mx-auto flex w-1/3 flex-col gap-5">
        <input
          type="text"
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-green mx-auto">Submit</button>
      </form>

      <div className="mt-5 flex justify-center">
        {isLogin ? (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            You don't have an account?
          </button>
        ) : (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            Already have an account?
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
