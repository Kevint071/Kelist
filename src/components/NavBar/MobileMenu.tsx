import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ setIsOpen, isOpen }) => {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex items-center md:hidden">
      <button
        onClick={toggleMenu}
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>
        {isOpen ? (
          <X className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="block h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default MobileMenu;
