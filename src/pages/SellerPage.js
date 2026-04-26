import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useUser } from "../context/user.js"
import { createProduct, importDummyProducts, resetProductCache } from "../api.js"

function SellerPage() {
    const navigate = useNavigate()
    const { user, isLoadingUser, becomeSeller } = useUser()
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: ""
    })
    const [image, setImage] = useState(null)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isImporting, setIsImporting] = useState(false)

    useEffect(() => {
        if (!isLoadingUser && !user) {
            navigate("/login")
        }
    }, [user, isLoadingUser, navigate])

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleBecomeSeller = async () => {
        try {
            setError("")
            setMessage("")
            await becomeSeller()
            setMessage("Seller access enabled successfully")
        } catch (err) {
            setError(err.response?.data?.message || "Unable to become seller")
        }
    }

    const handleSubmit = async () => {
        try {
            setError("")
            setMessage("")
            setIsSubmitting(true)

            const productData = new FormData()
            productData.append("title", formData.title)
            productData.append("description", formData.description)
            productData.append("price", formData.price)
            productData.append("category", formData.category)
            productData.append("brand", formData.brand)
            productData.append("stock", formData.stock)
            productData.append("image", image)

            await createProduct(productData)
            resetProductCache()
            setMessage("Product added successfully")
            setFormData({
                title: "",
                description: "",
                price: "",
                category: "",
                brand: "",
                stock: ""
            })
            setImage(null)
        } catch (err) {
            setError(err.response?.data?.message || "Unable to add product")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleImportDummyProducts = async () => {
        try {
            setError("")
            setMessage("")
            setIsImporting(true)
            const response = await importDummyProducts()
            resetProductCache()
            setMessage(`${response.data.data.length} dummy products imported`)
        } catch (err) {
            setError(err.response?.data?.message || "Unable to import dummy products")
        } finally {
            setIsImporting(false)
        }
    }

    if (isLoadingUser || !user) {
        return (
            <div className="flex justify-center items-center h-[60vh] text-gray-500">
                Loading seller page...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Seller</h1>
                    <p className="text-sm text-gray-500 mt-1">Current role: {user.role}</p>
                </div>

                {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
                {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

                {user.role !== "seller" && user.role !== "admin" ? (
                    <div className="border rounded-md p-4">
                        <p className="text-gray-700 mb-4">
                            Become a seller to add your own products.
                        </p>
                        <Button primary onClick={handleBecomeSeller}>
                            Become Seller
                        </Button>
                    </div>
                ) : (
                    <>
                    {user.role === "admin" && (
                        <div className="border rounded-md p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="font-semibold text-gray-800">Development Import</h2>
                                <p className="text-sm text-gray-500">Store dummy products in MongoDB once.</p>
                            </div>
                            <Button secondary onClick={handleImportDummyProducts} disabled={isImporting}>
                                {isImporting ? "Importing..." : "Import Dummy Products"}
                            </Button>
                        </div>
                    )}

                    {user.role === "seller" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Product title"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Category"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Price"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Available stock"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Brand"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => setImage(event.target.files[0])}
                                className="mt-1 w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                                file:bg-blue-50 file:text-blue-700
                                file:cursor-pointer file:transition
                                file:hover:bg-blue-100"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Product description"
                                rows="4"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Button primary onClick={handleSubmit} disabled={isSubmitting}>
                                {isSubmitting ? "Adding..." : "Add Product"}
                            </Button>
                        </div>
                    </div>
                    )}
                    </>
                )}
            </div>
        </div>
    )
}

export default SellerPage
