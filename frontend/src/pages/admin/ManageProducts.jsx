import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    images: []
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/api/products`
      );
      setProducts(res.data.reverse());
    } catch {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setFormData({
      title: product.title || "",
      price: product.price || "",
      description: product.description || "",
      images: product.images || []
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      price: "",
      description: "",
      images: []
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKENDURL}/api/products/${id}`,
        {
          title: formData.title,
          price: formData.price,
          description: formData.description
        }
      );

      toast.success("Product updated");
      fetchProducts();
      handleCancelEdit();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    toast((t) => (
      <div className="flex items-center gap-3">
        <span>Delete this product?</span>
        <button
          onClick={async () => {
            try {
              await axios.delete(
                `${import.meta.env.VITE_BACKENDURL}/api/products/${id}`
              );
              toast.dismiss(t.id);
              toast.success("Product deleted");
              fetchProducts();
            } catch {
              toast.error("Delete failed");
            }
          }}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    ));
  };

  const getImage = (product) => {
    if (Array.isArray(product?.images) && product.images.length > 0) {
      return product.images[0];
    }
    return "https://via.placeholder.com/150";
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 bg-white"
          >
            {editingId === product._id ? (
              <div className="space-y-3">
                <img
                  src={getImage(product)}
                  alt="Preview"
                  className="w-28 h-28 object-cover rounded border"
                />

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />

                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(product._id)}
                    className="bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white px-4 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center gap-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={getImage(product)}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded border"
                  />

                  <div>
                    <h2 className="font-semibold">{product.title}</h2>
                    <p className="text-sm">₹{product.price}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="p-2 bg-yellow-100 rounded"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-2 bg-red-100 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageProducts;
