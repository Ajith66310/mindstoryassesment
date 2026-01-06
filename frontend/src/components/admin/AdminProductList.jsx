import React from "react";

const AdminProductList = ({ products, onDelete, onEdit }) => {
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
          <th className="px-5 py-3 border-b">Image</th>
          <th className="px-5 py-3 border-b">Product</th>
          <th className="px-5 py-3 border-b">Price</th>
          <th className="px-5 py-3 border-b text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td className="px-5 py-5 border-b">
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-12 h-12 object-cover rounded"
              />
            </td>
            <td className="px-5 py-5 border-b font-medium">
              {product.title}
            </td>
            <td className="px-5 py-5 border-b">${product.price}</td>
            <td className="px-5 py-5 border-b text-center">
              <button
                onClick={() => onEdit(product._id)}
                className="text-blue-600 hover:text-blue-900 mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(product._id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminProductList;
