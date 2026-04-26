import { useState } from "react"
import { useUser } from "../context/user.js"
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"

function LoginPage() {
    const [formData, setFormData] = useState({ loginId: "", password: "" })
    const [error, setError] = useState("")
    const { login } = useUser()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        try {
            setError("")
            await login(formData)
            navigate("/")  // redirect to home after login
        } catch (err) {
            setError(err.response?.data?.message || "Login failed")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-sm border w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email or Username</label>
                        <input
                            type="text"
                            name="loginId"
                            value={formData.loginId}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email or username"
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

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <Button primary onClick={handleSubmit} className="mt-2 w-full justify-center">
                        Login
                    </Button>

                    <p className="text-sm text-center text-gray-500">
                        Don`t have an account?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline font-medium">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
