// RegisterPage.jsx
import { useState } from "react";
import Button from "../components/Button";
import { registerUser } from "../api.js"
import { Link, useNavigate } from "react-router-dom"

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
        const formDataToSend = new FormData()  // FormData because we have files
        formDataToSend.append("fullName", formData.fullName)
        formDataToSend.append("username", formData.username)
        formDataToSend.append("email", formData.email)
        formDataToSend.append("password", formData.password)
        formDataToSend.append("avatar", avatar)          // file
        formDataToSend.append("coverImage", coverImage)  // file

        const response = await registerUser(formDataToSend)
        console.log(response.data)
        alert("Registered successfully!")
        navigate("/login")

    } catch (error) {
        console.log(error)
        alert(error.response?.data?.message || "Something went wrong")
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
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
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

          <p className="text-sm text-center text-gray-500">
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
