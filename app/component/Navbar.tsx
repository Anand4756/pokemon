import { Menu, X } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <div className="flex items-center space-x-4">
          <img src="../logo.svg" alt="Logo" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
