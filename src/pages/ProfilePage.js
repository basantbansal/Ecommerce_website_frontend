import { useUser } from "../context/user.js"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Button from "../components/Button"
import { changePassword } from "../api.js"
import { useState } from "react"

function ProfilePage() {
    const { user, logout, isLoadingUser } = useUser()
    const navigate = useNavigate()
    const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
    const [passwordMessage, setPasswordMessage] = useState("")
    const [passwordError, setPasswordError] = useState("")

    useEffect(() => {
        if (!isLoadingUser && !user) {
            navigate("/login")
        }
    }, [user, isLoadingUser, navigate])

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }

    const handlePasswordChange = async () => {
        setPasswordError("")
        setPasswordMessage("")

        if (passwords.newPassword !== passwords.confirmPassword) {
            setPasswordError("New password and confirmation do not match")
            return
        }

        try {
            const response = await changePassword(passwords.currentPassword, passwords.newPassword)
            setPasswordMessage(response.data?.message || "Password changed successfully. Please log in again.")
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" })
            await logout()
            navigate("/login")
        } catch (error) {
            setPasswordError(error.response?.data?.message || "Unable to change password")
        }
    }

    if (isLoadingUser || !user) {
        return (
            <div className="flex justify-center items-center h-[60vh] text-gray-500">
                Loading profile...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-sm border w-full max-w-md">

                {/* Cover Image */}
                {user.coverImage && (
                    <img
                        src={user.coverImage}
                        alt="cover"
                        className="w-full h-32 object-cover rounded-md mb-4"
                    />
                )}

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={user.avatar}
                        alt={user.username}
                        className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2 text-sm text-gray-700 mb-6">
                    <p><span className="font-medium">Email:</span> {user.email}</p>
                    <p><span className="font-medium">Role:</span> {user.role}</p>
                </div>

                <section className="border-t pt-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Security</h3>
                    <p className="mt-1 text-sm text-gray-500">Change your password. You will be signed out afterward.</p>
                    <div className="mt-4 flex flex-col gap-3">
                        <input type="password" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} placeholder="Current password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        <input type="password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} placeholder="New password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        <input type="password" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} placeholder="Confirm new password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        <p className="text-xs text-gray-500">At least 8 characters, including uppercase, lowercase, and a number.</p>
                        {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                        {passwordMessage && <p className="text-sm text-green-600">{passwordMessage}</p>}
                        <Button outline onClick={handlePasswordChange} className="w-full justify-center">Change password</Button>
                    </div>
                </section>

                <Button danger outline onClick={handleLogout} className="w-full justify-center">
                    Logout
                </Button>

            </div>
        </div>
    )
}

export default ProfilePage
