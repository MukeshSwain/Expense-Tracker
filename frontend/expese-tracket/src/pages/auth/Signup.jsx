import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { validateEmail } from "../../utils/helper";
import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCircleNotch } from "react-icons/fa6";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!validateEmail(email)) {
        setError("Please enter a valid email");
        return;
      }
      if(!profilePic){
        setError("Please select a profile picture");
        return;
      }
      if(!fullName){
        setError("Please enter your full name");
        return;
      }
      if(!password){
        setError("Please enter a password");
        return;
      }
      const formData = new FormData();
      if(profilePic){
        formData.append("profilePic", profilePic);
      }
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      const res = await axios.post("http://localhost:3000/api/auth/register", formData);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
        setError("");
      }
      
    } catch (error) {
      setError(error.message);
      
      
    }finally{
      setProfilePic(null);
      setFullName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  }
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center gap-2">
        <h3 className="text-xl font-bold text-black">Create a free account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter required details to create your account
        </p>
        <form onSubmit={handleSignup} className="flex flex-col gap-2 w-[90%] items-center justify-center">
          <div>
            <label htmlFor="profilePic" className="">
              {profilePic ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(profilePic)}
                    alt=""
                    className="w-20 h-20 rounded-full"
                  />
                  <RiDeleteBin6Line
                    onClick={() => setProfilePic(null)}
                    size={24}
                    className="absolute bottom-0  bg-red-500 cursor-pointer text-white p-1 rounded-full right-1"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 h-20 w-20 rounded-full bg-purple-200 justify-center relative">
                  <LuUser
                    size={30}
                    className="text-2xl cursor-pointer text-purple-500 flex items-center justify-center"
                  />
                  <FiUpload
                    size={24}
                    className="text-2xl cursor-pointer bg-purple-500 text-white rounded-full p-1  absolute bottom-0 right-1 "
                  />
                </div>
              )}
            </label>
            <input
              type="file"
              id="profilePic"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="hidden"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                placeholder="Ex: John Doe"
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                autoComplete="fullName"
                className="border text-sm outline-none border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                placeholder="Ex: mDjw@example.com"
                type="email"
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
            <p className="text-xs text-red-500">{error && `${error}*`}</p>
          </div>
          <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-sm cursor-pointer text-center text-white py-2 rounded-md w-full mx-auto mt-2">
          
             {loading ? (
                          <span className="flex items-center justify-center gap-1">
                            <FaCircleNotch className="animate-spin" size={20} />
                            please wait...
                          </span>
                        ) : (
                          "SIGN UP"
                        )}
          </button>
        </form>
        <p>
          Already have an account?
          <span className="underline text-sm text-purple-600">
            <Link to={"/login"}> Login</Link>
          </span>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Signup;
