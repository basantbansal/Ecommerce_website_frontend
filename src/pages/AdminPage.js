import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import fetchItems, {
    deleteProduct,
    importDummyProducts,
    resetProductCache,
    updateProductStock
} from "../api.js"
import { useUser } from "../context/user.js"

function AdminPage() {
    const navigate = useNavigate()
    const { user, isLoadingUser } = useUser()
    const [products, setProducts] = useState([])
    const [stockValues, setStockValues] = useState({})
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [isLoadingProducts, setIsLoadingProducts] = useState(true)
    const [isImporting, setIsImporting] = useState(false)
    const [updatingProductId, setUpdatingProductId] = useState("")
    const [deletingProductId, setDeletingProductId] = useState("")

    useEffect(() => {
        if (!isLoadingUser && !user) {
            navigate("/login")
        }

        if (!isLoadingUser && user && user.role !== "admin") {
            navigate("/")
        }
    }, [user, isLoadingUser, navigate])

    const loadProducts = async () => {
        try {
            setError("")
            setIsLoadingProducts(true)
            const data = await fetchItems({ forceRefresh: true })
            setProducts(data)
            setStockValues(
                data.reduce((values, product) => {
                    values[product._id || product.id] = product.stock ?? 0
                    return values
                }, {})
            )
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load products")
        } finally {
            setIsLoadingProducts(false)
        }
    }

    useEffect(() => {
        if (!isLoadingUser && user?.role === "admin") {
            loadProducts()
        }
    }, [user, isLoadingUser])

    const handleImportDummyProducts = async () => {
        try {
            setError("")
            setMessage("")
            setIsImporting(true)
            const response = await importDummyProducts()
            resetProductCache()
            setMessage(`${response.data.data.length} dummy products imported`)
            await loadProducts()
        } catch (err) {
            setError(err.response?.data?.message || "Unable to import dummy products")
        } finally {
            setIsImporting(false)
        }
    }

    const handleStockChange = (productId, stock) => {
        setStockValues({
            ...stockValues,
            [productId]: stock
        })
    }

    const handleUpdateStock = async (productId) => {
        try {
            setError("")
            setMessage("")
            setUpdatingProductId(productId)
            const stock = Number(stockValues[productId])
            const response = await updateProductStock(productId, stock)
            resetProductCache()
            setMessage("Product stock updated")
            setProducts((currentProducts) =>
                currentProducts.map((product) =>
                    product._id === productId ? response.data.data : product
                )
            )
        } catch (err) {
            setError(err.response?.data?.message || "Unable to update stock")
        } finally {
            setUpdatingProductId("")
        }
    }

    const handleDeleteProduct = async (productId) => {
        try {
            setError("")
            setMessage("")
            setDeletingProductId(productId)
            await deleteProduct(productId)
            resetProductCache()
            setProducts((currentProducts) =>
                currentProducts.filter((product) => product._id !== productId)
            )
            setMessage("Product deleted successfully")
        } catch (err) {
            setError(err.response?.data?.message || "Unable to delete product")
        } finally {
            setDeletingProductId("")
        }
    }

    if (isLoadingUser || !user || user.role !== "admin") {
        return (
            <div className="flex justify-center items-center h-[60vh] text-gray-500">
                Loading admin panel...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage products and development imports.</p>
                        </div>
                        <Button secondary onClick={handleImportDummyProducts} disabled={isImporting}>
                            {isImporting ? "Importing..." : "Import Dummy Products"}
                        </Button>
                    </div>

                    {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
                    {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
                </div>

                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="border-b px-6 py-4">
                        <h2 className="font-semibold text-gray-800">Products</h2>
                    </div>

                    {isLoadingProducts ? (
                        <div className="p-6 text-gray-500">Loading products...</div>
                    ) : products.length === 0 ? (
                        <div className="p-6 text-gray-500">No products found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Product</th>
                                        <th className="px-6 py-3 font-medium">Category</th>
                                        <th className="px-6 py-3 font-medium">Price</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                        <th className="px-6 py-3 font-medium">Stock</th>
                                        <th className="px-6 py-3 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {products.map((product) => {
                                        const productId = product._id || product.id

                                        return (
                                            <tr key={productId} className="align-middle">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3 min-w-64">
                                                        <img
                                                            src={product.thumbnail}
                                                            alt={product.title}
                                                            className="h-12 w-12 rounded-md object-cover border"
                                                        />
                                                        <div>
                                                            <p className="font-medium text-gray-800">{product.title}</p>
                                                            <p className="text-xs text-gray-500">{product.brand || "No brand"}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{product.category || "N/A"}</td>
                                                <td className="px-6 py-4 text-gray-700">${product.price}</td>
                                                <td className="px-6 py-4 text-gray-600">{product.availabilityStatus}</td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={stockValues[productId] ?? ""}
                                                        onChange={(event) => handleStockChange(productId, event.target.value)}
                                                        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        <Button
                                                            primary
                                                            onClick={() => handleUpdateStock(productId)}
                                                            disabled={updatingProductId === productId}
                                                        >
                                                            {updatingProductId === productId ? "Saving..." : "Save"}
                                                        </Button>
                                                        <Button
                                                            danger
                                                            onClick={() => handleDeleteProduct(productId)}
                                                            disabled={deletingProductId === productId}
                                                        >
                                                            {deletingProductId === productId ? "Deleting..." : "Delete"}
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminPage
