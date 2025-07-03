"use client";
import { useState } from "react";

const navItems = [
  { name: "Home", link: "/" },
  {
    name: "About",
    link: "/",
   
  },
  { name: "Services", link: "/services",
     submenu: [
      { name: "Freelancer", link: "/freelancer" },
       { name: "Contact", link: "/contact" },
     ],
   },
  {
    name: "Skills",
    link: "/skills",
  },
];

// Custom Logo Component
const CustomLogo = ({ size = 64 }) => (
  <div className={`relative flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg`} style={{ width: size, height: size }}>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg opacity-90"></div>
    <div className="relative z-10 text-white font-bold text-2xl">
      <span className="text-3xl">⚡</span>
    </div>
    <div className="absolute inset-0 rounded-lg ring-2 ring-white/20"></div>
  </div>
);

// Custom Icons (replacing @tabler/icons-react)
const MenuIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const XIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ChevronDownIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.097"/>
  </svg>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleItemClick = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "8948681079";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-gray-900 text-white shadow-md">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto py-3 px-6">
        <a href="/">
          <CustomLogo size={64} />
        </a>

        <div className="flex space-x-6 text-base font-medium items-center">
          {navItems.map((item) =>
            item.submenu ? (
              <div key={item.name} className="relative">
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="flex items-center gap-1 hover:text-gray-300"
                >
                  {item.name}
                  <ChevronDownIcon
                    size={16}
                    className={`transition-transform ${
                      activeDropdown === item.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === item.name && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg z-50">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.link}
                        onClick={handleItemClick}
                        className="block px-4 py-2 text-sm hover:bg-gray-700"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div key={item.name}>
                {item.link.startsWith("http") ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300"
                  >
                    {item.name}
                  </a>
                ) : (
                  <a
                    href={item.link}
                    onClick={handleItemClick}
                    className="hover:text-gray-300"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            )
          )}
        </div>

        <button
          onClick={handleWhatsAppClick}
          className="ml-6 flex items-center gap-2 rounded-lg border border-green-500 bg-green-600 px-6 py-2 font-medium hover:bg-green-700 transition"
        >
          <WhatsAppIcon size={20} />
          WhatsApp
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden px-4 py-3">
        <div className="flex items-center justify-between">
          <a href="/">
            <CustomLogo size={56} />
          </a>
          <button
            className="text-white p-2"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-4 rounded-lg bg-gray-900 px-4 py-6 shadow-md">
            <div className="flex flex-col gap-3">
              {navItems.map((item) =>
                item.submenu ? (
                  <div key={item.name}>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex w-full items-center justify-between px-4 py-2 rounded hover:bg-gray-700"
                    >
                      <span>{item.name}</span>
                      <ChevronDownIcon
                        size={18}
                        className={`transition-transform ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.link}
                            onClick={handleItemClick}
                            className="block rounded px-4 py-2 text-sm hover:bg-gray-700"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div key={item.name} className="px-4 py-2">
                    {item.link.startsWith("http") ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <a
                        href={item.link}
                        onClick={handleItemClick}
                        className="hover:text-white"
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                )
              )}
              <button
                onClick={handleWhatsAppClick}
                className="mt-4 flex items-center justify-center gap-2 w-full rounded-md bg-green-600 px-6 py-3 text-center font-semibold hover:bg-green-700"
              >
                <WhatsAppIcon size={20} />
                WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}