import { useUser } from "../context/user.js"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Button from "../components/Button"

function ProfilePage() {
    const { user, logout, isLoadingUser } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoadingUser && !user) {
            navigate("/login")
        }
    }, [user, isLoadingUser, navigate])

    const handleLogout = async () => {
        await logout()
        navigate("/login")
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

                <Button danger outline onClick={handleLogout} className="w-full justify-center">
                    Logout
                </Button>

            </div>
        </div>
    )
}

export default ProfilePage
