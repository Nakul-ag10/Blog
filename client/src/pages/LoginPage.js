import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/authcontext";

function LoginPage() {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const [error, setError] = useState('')
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formdata);
      const { user, token } = res.data;
      login(user, token); // store user and token
      console.log(res.data);
      navigate("/profile");
    } catch (err) {
      setLoginFailed(true);
      if(err.response && err.response.status === 400){
        setError('Invald Credentials')
      }
      else{
        setError('Something went wrong');
      }
      console.error("Login failed:", err.response?.data || err.message);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
    <div className="flex flex-col justify-center rounded-lg px-6 py-12 lg:px-8 bg-gray-800">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-300">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id = "email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  value={formdata.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  ${loginFailed? `outline-2 outline-red-500` : `outline-1 -outline-offset-1 outline-gray-300`}  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-300">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id = "password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formdata.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 ${loginFailed? `outline-2 outline-red-500` : `outline-1 -outline-offset-1 outline-gray-300`} placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                />
              </div>
            </div>

            <div>
              {error && <p className="text-red-500 text-sm/6 font-semibold mt-4">{error}</p>}
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Create new account
            </Link>
          </p>
        </div>
      </div>
      </div>
  )
}


export default LoginPage;
