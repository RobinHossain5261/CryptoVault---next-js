import { CuboidIcon as Cube, Menu } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-black z-50 flex items-center justify-between p-6 lg:px-12">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        {/* <div className="relative">
          <Cube className="w-8 h-8 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded blur-sm opacity-50" />
        </div> */}
        <span className="text-xl font-bold text-white">CryptoVault</span>
      </div>

      {/* Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
        {["Home", "Features", "Roadmap", "FAQ", "Blog", "Contact"].map(
          (item) => (
            <a
              key={item}
              href="#"
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </a>
          )
        )}
      </nav>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <Menu className="w-6 h-6 text-white" />
      </div>

      {/* CTA Button */}
      <Button className="hidden lg:flex bg-blue-600 hover:bg-purple-700 text-white border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
        Try it Now
      </Button>
    </header>
  );
};

export default Header;
