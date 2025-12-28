"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Package, ShoppingCart, Plus, Edit, Trash2, Eye, DollarSign } from "lucide-react";
import { useToast } from "@/lib/toast-context";

interface Order {
  id: number;
  orderNumber: string;
  totalAmount: number;
  status: string;
  shippingAddress?: string;
  createdAt: string;
  items?: any[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isPopular: boolean;
  isOnSale: boolean;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      fetchProducts();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/auth");
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      router.push("/admin/login");
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });

      if (response.ok) {
        toast.success("Order status updated");
        fetchOrders();
      }
    } catch (error) {
      toast.error("Failed to update order");
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/admin/products?id=${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Product deleted");
        fetchProducts();
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const viewOrderDetails = async (orderId: number) => {
    try {
      const response = await fetch(`/api/admin/orders?id=${orderId}`);
      const data = await response.json();
      setViewingOrder(data);
    } catch (error) {
      toast.error("Failed to load order details");
    }
  };

  const stats = {
    totalOrders: orders.length,
    totalProducts: products.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    pendingOrders: orders.filter((o) => o.status === "pending").length,
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-1">Manage your store orders and products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Orders</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalOrders}</p>
              </div>
              <ShoppingCart className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Products</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalProducts}</p>
              </div>
              <Package className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-10 h-10 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending Orders</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.pendingOrders}</p>
              </div>
              <Eye className="w-10 h-10 text-amber-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="border-b border-slate-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === "orders"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === "products"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Products
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "orders" ? (
              <OrdersTab 
                orders={orders} 
                loading={loading} 
                updateOrderStatus={updateOrderStatus}
                onViewDetails={viewOrderDetails}
              />
            ) : (
              <ProductsTab
                products={products}
                loading={loading}
                deleteProduct={deleteProduct}
                onAddProduct={() => setShowAddProduct(true)}
                onEditProduct={setEditingProduct}
              />
            )}
          </div>
        </div>
      </div>

      {(showAddProduct || editingProduct) && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowAddProduct(false);
            setEditingProduct(null);
          }}
          onSuccess={() => {
            fetchProducts();
            setShowAddProduct(false);
            setEditingProduct(null);
          }}
        />
      )}

      {viewingOrder && (
        <OrderDetailsModal
          order={viewingOrder}
          onClose={() => setViewingOrder(null)}
        />
      )}
    </div>
  );
}

function OrdersTab({
  orders,
  loading,
  updateOrderStatus,
  onViewDetails,
}: {
  orders: Order[];
  loading: boolean;
  updateOrderStatus: (id: number, status: string) => void;
  onViewDetails: (id: number) => void;
}) {
  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center py-8 text-slate-600">No orders yet</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 font-semibold text-slate-900">Order #</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-900">Amount</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-900">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-900">Date</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="py-3 px-4 font-mono text-sm">{order.orderNumber}</td>
              <td className="py-3 px-4 font-semibold">${order.totalAmount.toFixed(2)}</td>
              <td className="py-3 px-4">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="px-3 py-1 rounded-lg border border-slate-300 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td className="py-3 px-4 text-sm text-slate-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">
                <button 
                  onClick={() => onViewDetails(order.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductsTab({
  products,
  loading,
  deleteProduct,
  onAddProduct,
  onEditProduct,
}: {
  products: Product[];
  loading: boolean;
  deleteProduct: (id: string) => void;
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
}) {
  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">All Products</h2>
        <button
          onClick={onAddProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-slate-900 mb-1">{product.name}</h3>
            <p className="text-sm text-slate-600 mb-2 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
              <span className="text-xs bg-slate-200 px-2 py-1 rounded">{product.category}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEditProduct(product)}
                className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderDetailsModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Order Details</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Order Number</p>
                <p className="font-mono font-semibold">{order.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Status</p>
                <p className="font-semibold capitalize">{order.status}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Amount</p>
                <p className="font-semibold text-lg">${order.totalAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Order Date</p>
                <p className="font-semibold">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          {(order.customerEmail || order.customerName) && (
            <div>
              <h3 className="font-semibold mb-3">Customer Information</h3>
              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                {order.customerName && (
                  <div>
                    <p className="text-sm text-slate-600">Name</p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                )}
                {order.customerEmail && (
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <p className="font-medium">{order.customerEmail}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div>
              <h3 className="font-semibold mb-3">Shipping Address</h3>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="whitespace-pre-line">{order.shippingAddress}</p>
              </div>
            </div>
          )}

          {/* Order Items */}
          {order.items && order.items.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Order Items</h3>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left py-2 px-4 text-sm font-semibold">Product</th>
                      <th className="text-center py-2 px-4 text-sm font-semibold">Quantity</th>
                      <th className="text-right py-2 px-4 text-sm font-semibold">Price</th>
                      <th className="text-right py-2 px-4 text-sm font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id} className="border-t border-slate-100">
                        <td className="py-3 px-4">
                          <p className="font-medium">{item.productName || item.productId}</p>
                        </td>
                        <td className="py-3 px-4 text-center">{item.quantity}</td>
                        <td className="py-3 px-4 text-right">${item.price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payment Method */}
          {order.paymentMethod && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">Payment Method</p>
              <p className="font-semibold text-blue-900">{order.paymentMethod}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductModal({
  product,
  onClose,
  onSuccess,
}: {
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    originalPrice: product?.originalPrice || "",
    image: product?.image || "",
    category: product?.category || "",
    isPopular: product?.isPopular || false,
    isOnSale: product?.isOnSale || false,
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = "/api/admin/products";
      const method = product ? "PUT" : "POST";
      const body = product ? { id: product.id, ...formData } : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success(product ? "Product updated" : "Product added");
        onSuccess();
      } else {
        toast.error("Failed to save product");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-6">{product ? "Edit Product" : "Add New Product"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Original Price (optional)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isPopular}
                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                className="rounded border-slate-300"
              />
              <span className="text-sm text-slate-700">Popular Product</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isOnSale}
                onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
                className="rounded border-slate-300"
              />
              <span className="text-sm text-slate-700">On Sale</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
