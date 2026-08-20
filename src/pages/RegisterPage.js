// RegisterPage.jsx
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { registerUser } from "../api.js"
import { Link, useNavigate } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google'
import { useUser } from "../context/user.js"

function RegisterPage() {
  const navigate = useNavigate();
  const { googleLogin } = useUser();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Load saved data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("registerFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData((prev) => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);
    // Save only the text fields to localStorage
    const dataToSave = {
      fullName: updatedData.fullName,
      username: updatedData.username,
      email: updatedData.email,
    };
    localStorage.setItem("registerFormData", JSON.stringify(dataToSave));
  };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    };

  const handleSubmit = async () => {
    try {
        const formDataToSend = new FormData()  // FormData because we have files
        formDataToSend.append("fullName", formData.fullName)
        formDataToSend.append("username", formData.username)
        formDataToSend.append("email", formData.email)
        formDataToSend.append("password", formData.password)
        if (avatar) {
          formDataToSend.append("avatar", avatar)          // file
        }
        if (coverImage) {
          formDataToSend.append("coverImage", coverImage)  // file
        }

        const response = await registerUser(formDataToSend)
        console.log(response.data)
        // Clear localStorage on success
        localStorage.removeItem("registerFormData");
        navigate("/login", { state: { message: "Registered successfully! Check your inbox and verify your email before logging in." } })

    } catch (error) {
        console.log(error)
        alert(error.response?.data?.message || "Something went wrong")
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
        await googleLogin(credentialResponse.credential)
        navigate("/", { state: { message: "Registered and logged in successfully" } })
    } catch (err) {
        alert(err.response?.data?.message || "Google Login failed")
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-sm border w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                minLength="8"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">At least 8 characters, including uppercase, lowercase, and a number.</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Avatar <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="mt-1 w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                file:bg-blue-50 file:text-blue-700
                file:cursor-pointer file:transition
                file:hover:bg-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="mt-1 w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                file:bg-gray-50 file:text-gray-700
                file:cursor-pointer file:transition
                file:hover:bg-gray-100"
            />
          </div>

          <Button primary onClick={handleSubmit} className="mt-2 w-full justify-center">
            Register
          </Button>

          <div className="flex items-center my-2 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0 text-sm text-gray-500">OR</p>
          </div>

          <div className="flex justify-center w-full">
              <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => alert("Google login failed")}
              />
          </div>

          <p className="text-sm text-center text-gray-500 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
