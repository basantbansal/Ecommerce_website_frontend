import { useState } from "react"
import { useUser } from "../context/user.js"
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { resendVerificationEmail } from "../api.js"
import { GoogleLogin } from '@react-oauth/google'

function LoginPage() {
    const [formData, setFormData] = useState({ loginId: "", password: "" })
    const [error, setError] = useState("")
    const [verificationMessage, setVerificationMessage] = useState("")
    const [needsVerification, setNeedsVerification] = useState(false)
    const { login, googleLogin } = useUser()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        try {
            setError("")
            setVerificationMessage("")
            setNeedsVerification(false)
            await login(formData)
            navigate("/")  // redirect to home after login
        } catch (err) {
            const message = err.response?.data?.message || "Login failed"
            setError(message)
            setNeedsVerification(err.response?.status === 403)
        }
    }

    const handleResendVerification = async () => {
        try {
            const response = await resendVerificationEmail(formData.loginId)
            setVerificationMessage(response.data?.message || "If that account needs verification, a new link has been sent.")
        } catch {
            setVerificationMessage("Unable to send a verification link. Please try again.")
        }
    }

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setError("")
            await googleLogin(credentialResponse.credential)
            navigate("/")
        } catch (err) {
            setError(err.response?.data?.message || "Google Login failed")
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
                    {needsVerification && (
                        <div className="text-sm text-center">
                            <p className="text-gray-600">Use your email address above to request a new verification link.</p>
                            <button type="button" onClick={handleResendVerification} className="mt-1 text-blue-500 hover:underline">
                                Resend verification email
                            </button>
                        </div>
                    )}
                    {verificationMessage && <p className="text-sm text-center text-gray-600">{verificationMessage}</p>}

                    <Button primary onClick={handleSubmit} className="mt-2 w-full justify-center">
                        Login
                    </Button>

                    <div className="flex items-center my-2 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                        <p className="text-center font-semibold mx-4 mb-0 text-sm text-gray-500">OR</p>
                    </div>

                    <div className="flex justify-center w-full">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError("Google login failed")}
                        />
                    </div>

                    <Link to="/forgot-password" className="text-sm text-center text-blue-500 hover:underline mt-2">
                        Forgot password?
                    </Link>

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
