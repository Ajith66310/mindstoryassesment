
import { NavLink } from "react-router-dom";
import { Home, PlusCircle, List } from "lucide-react";

const AdminSidebar = () => {
  const linkClasses = ({ isActive }) =>
    `group relative flex items-center justify-center p-3 rounded 
     hover:bg-gray-100 ${
       isActive ? "bg-gray-200" : ""
     }`;

  return (
    <div className="w-16 h-auto bg-white shadow-lg p-2 flex flex-col items-center">
      <h1 className="text-xs font-bold mb-6 font-mono">Admin</h1>

      <nav className="flex flex-col gap-3">
        <NavLink to="/admin/dashboard" className={linkClasses}>
          <Home size={22} />

          {/* Tooltip */}
          <span className="absolute left-14 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Dashboard
          </span>
        </NavLink>

        <NavLink to="/admin/add-product" className={linkClasses}>
          <PlusCircle size={22} />
          <span className="absolute left-14 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Add Product
          </span>
        </NavLink>

        <NavLink to="/admin/manage-products" className={linkClasses}>
          <List size={22} />
          <span className="absolute left-14 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Manage Products
          </span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
