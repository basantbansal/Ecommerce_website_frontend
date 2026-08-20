import { useState } from "react"
import { useUser } from "../context/user.js"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Button from "../components/Button"
import PopUp from "../components/PopUp"
import { resendVerificationEmail } from "../api.js"
import { GoogleLogin } from '@react-oauth/google'

function LoginPage() {
    const [formData, setFormData] = useState({ loginId: "", password: "" })
    const [error, setError] = useState("")
    const [verificationMessage, setVerificationMessage] = useState("")
    const [needsVerification, setNeedsVerification] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { login, googleLogin } = useUser()
    const navigate = useNavigate()
    const location = useLocation()
    const [showPopup, setShowPopup] = useState(!!location.state?.message)
    const [popupMessage, setPopupMessage] = useState(location.state?.message || "")

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit()
        }
    }

    const handleSubmit = async () => {
        try {
            setError("")
            setVerificationMessage("")
            setNeedsVerification(false)
            await login(formData)
            navigate("/", { state: { message: "Logged in successfully" } })  // redirect to home after login
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
            navigate("/", { state: { message: "Logged in successfully" } })
        } catch (err) {
            setError(err.response?.data?.message || "Google Login failed")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            {showPopup && (
                <PopUp onClose={() => setShowPopup(false)}>
                    {popupMessage}
                </PopUp>
            )}
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
                            onKeyDown={handleKeyDown}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email or username"
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
