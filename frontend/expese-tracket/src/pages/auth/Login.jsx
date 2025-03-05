import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { validateEmail } from "../../utils/helper";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { FaCircleNotch } from "react-icons/fa6";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!validateEmail(email)) {
        setError("Please enter a valid email");
        console.log(error);

        return;
      }
      const input = {
        email,
        password,
      };
      const res = await axios.post(
        "https://expense-tracker-kwhq.onrender.com/auth/login",
        input,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/dashboard");
        toast.success(res.data.message);
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center gap-2">
        <h3 className="text-xl font-bold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>
        <form onSubmit={handleLogin} className="flex flex-col gap-2 w-[90%]">
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              placeholder="Ex: mDjw@example.com"
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="email"
              className="border text-sm outline-none border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="relative">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="border text-sm outline-none border-gray-300 rounded-md px-4 py-2 w-full"
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute right-2 top-8 cursor-pointer "
                size={20}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <IoEyeOutline
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-8 cursor-pointer "
                size={20}
              />
            )}
          </div>
          <button className="bg-purple-500 hover:bg-purple-600 text-sm cursor-pointer text-center text-white py-2 rounded-md w-full mx-auto mt-2">
            {loading ? (
              <span className="flex items-center justify-center gap-1">
                <FaCircleNotch className="animate-spin" size={20} />
                please wait...
              </span>
            ) : (
              "LOGIN"
            )}
          </button>
        </form>
        <p>
          Don't have an account?
          <span className="underline text-sm text-purple-600">
            <Link to={"/signup"}> Sign Up</Link>
          </span>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;
