import { useUser } from "../context/user.js"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Button from "../components/Button"
import { changePassword, updateAccountDetails } from "../api.js"
import { useState } from "react"
import PopUp from "../components/PopUp"

function ProfilePage() {
    const { user, logout, isLoadingUser } = useUser()
    const navigate = useNavigate()
    const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
    const [passwordMessage, setPasswordMessage] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
    // Popup state
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState("")
    
    // Name edit state
    const { setUser } = useUser()
    const [isEditingName, setIsEditingName] = useState(false)
    const [newName, setNewName] = useState("")
    const [nameError, setNameError] = useState("")
    const [isUpdatingName, setIsUpdatingName] = useState(false)

    const handleEditName = () => {
        setNewName(user.fullName)
        setIsEditingName(true)
        setNameError("")
    }

    const handleNameKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSaveName()
        }
    }

    const handlePasswordKeyDown = (e) => {
        if (e.key === "Enter") {
            handlePasswordChange()
        }
    }

    const handleSaveName = async () => {
        if (!newName.trim()) {
            setNameError("Name cannot be empty")
            return
        }
        setIsUpdatingName(true)
        setNameError("")
        try {
            const response = await updateAccountDetails(newName.trim())
            setUser(response.data.data) // Update context with new user data
            setIsEditingName(false)
            setPopupMessage("Name updated successfully")
            setShowPopup(true)
        } catch (error) {
            setNameError(error.response?.data?.message || "Failed to update name")
        } finally {
            setIsUpdatingName(false)
        }
    }

    const handleCancelEdit = () => {
        setIsEditingName(false)
        setNameError("")
    }
    useEffect(() => {
        if (!isLoadingUser && !user) {
            navigate("/login")
        }
    }, [user, isLoadingUser, navigate])

    const handleLogout = async () => {
        await logout()
        navigate("/login", { state: { message: "Logged out successfully" } })
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
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" })
            await logout()
            navigate("/login", { state: { message: response.data?.message || "Password changed successfully. Please log in again." } })
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
            {showPopup && (
                <PopUp onClose={() => setShowPopup(false)}>
                    {popupMessage}
                </PopUp>
            )}
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
                    <div className="flex-1">
                        {!isEditingName ? (
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
                                <button onClick={handleEditName} className="text-sm text-blue-600 hover:underline focus:outline-none">Edit</button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 mt-1 mb-2">
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="text" 
                                        value={newName} 
                                        onChange={(e) => setNewName(e.target.value)} 
                                        onKeyDown={handleNameKeyDown}
                                        className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                                        autoFocus
                                    />
                                    <button 
                                        onClick={handleSaveName} 
                                        disabled={isUpdatingName}
                                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {isUpdatingName ? "Saving..." : "Save"}
                                    </button>
                                    <button 
                                        onClick={handleCancelEdit} 
                                        disabled={isUpdatingName}
                                        className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                {nameError && <p className="text-xs text-red-500">{nameError}</p>}
                            </div>
                        )}
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
                        <input type="password" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} onKeyDown={handlePasswordKeyDown} placeholder="Current password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        <input type="password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} onKeyDown={handlePasswordKeyDown} placeholder="New password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        <input type="password" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} onKeyDown={handlePasswordKeyDown} placeholder="Confirm new password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
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
