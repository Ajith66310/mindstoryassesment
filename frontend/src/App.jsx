import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageProducts from "./pages/admin/ManageProducts.jsx";
import AllProducts from './components/AllProducts.jsx';
import ProductForm from "./components/admin/ProductForm.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/allproducts' element={<AllProducts />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="edit-product/:id" element={<ProductForm />} />
        </Route>

        <Route path="/admin/edit-product/:id" element={<ProductForm />} />

        <Route path="*" element={<div className="p-10 text-center">404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;