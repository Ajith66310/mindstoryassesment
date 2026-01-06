import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImagePlus, X, Loader2 } from "lucide-react";

const ProductForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    images: ["", "", "", ""]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (index, file) => {
    if (!file) return;
    const updated = [...formData.images];
    updated[index] = file;
    setFormData({ ...formData, images: updated });
  };

  const removeImage = (index) => {
    const updated = [...formData.images];
    updated[index] = "";
    setFormData({ ...formData, images: updated });
  };

  const handleClear = () => {
    setFormData({
      title: "",
      price: "",
      description: "",
      images: ["", "", "", ""]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("description", formData.description);

      formData.images.forEach((img) => {
        if (img instanceof File) data.append("images", img);
      });

      await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/products`,
        data
      );

      navigate("/admin/manage-products");
    } catch (error) {
      console.error("Creation failed:", error);
      alert("Failed to add product. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-white px-6 py-10">
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-semibold mb-8">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* IMAGE UPLOAD SECTION */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              Product Images (up to 4)
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {formData.images.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden"
                >
                  {img ? (
                    <>
                      <img
                        src={URL.createObjectURL(img)}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-white border rounded-full p-1 shadow-sm"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <label className="flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:text-gray-600 transition">
                      <ImagePlus size={28} />
                      <span className="text-xs mt-1">Upload</span>
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        disabled={isSubmitting}
                        onChange={(e) =>
                          handleImageUpload(index, e.target.files[0])
                        }
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* INPUT FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter product name"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="0.00"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Tell customers about this product..."
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* SUBMIT ACTIONS */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClear}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2 rounded-lg bg-green-600 text-white font-medium flex items-center gap-2 hover:bg-green-700 disabled:opacity-60 transition"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
