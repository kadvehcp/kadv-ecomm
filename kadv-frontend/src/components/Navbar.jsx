import { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Atom, Menu, Search, ShoppingCart, User, X } from "lucide-react";

const MAIN_NAVIGATION_ITEMS = [
  { name: "HOME", link: "/" },
  { name: "COLLECTION", link: "/collection" },
  { name: "ABOUT", link: "/about" },
  { name: "CONTACT", link: "/contact" },
];

const USER_MENU_ITEMS = [
  { name: "My Profile", link: "/profile" },
  { name: "Orders", link: "/orders" },
  { name: "Logout", action: "logout" },
];

const Navbar = () => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const userMenuRef = useRef(null);

  useEffect(() => {
    if (!userMenuVisible) return;
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target))
        setUserMenuVisible(false);
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [userMenuVisible]);

  useEffect(() => {
    if (!mobileMenuVisible) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuVisible]);

  return (
    <header className="relative flex items-center justify-between py-5 font-medium z-20 text-gray-700">
      <Logo Icon={Atom} heading={"kadv-ecomm"} />
      <ul className="hidden md:flex space-x-4 items-center text-sm">
        {MAIN_NAVIGATION_ITEMS.map(({ name, link }) => (
          <li key={link}>
            <NavLink
              to={link}
              className={({ isActive }) =>
                isActive ? "text-black" : "text-gray-500 hover:text-gray-700"
              }
            >
              <span>{name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-5">
        <Search className="cursor-pointer" />

        <div ref={userMenuRef} className="group relative">
          <button
            onClick={() => setUserMenuVisible((visible) => !visible)}
            aria-expanded={userMenuVisible}
            aria-controls="user-dropdown-menu"
            className="p-0 bg-transparent border-0 flex items-center cursor-pointer"
          >
            <User />
          </button>
          {userMenuVisible && (
            <UserMenu
              userMenuItems={USER_MENU_ITEMS}
              onClose={setUserMenuVisible}
            />
          )}
        </div>

        <Link to="/cart" className="relative">
          <ShoppingCart />
          <span className="absolute -right-1.5 -bottom-1.5 w-4 aspect-square rounded-full leading-4 text-center bg-black text-white text-[7px]">
            77
          </span>
        </Link>

        <Menu
          onClick={() => setMobileMenuVisible(true)}
          className="cursor-pointer md:hidden"
        />
      </div>
      {mobileMenuVisible && (
        <MobileNavbar
          mainNavigationItems={MAIN_NAVIGATION_ITEMS}
          onClose={setMobileMenuVisible}
        />
      )}
    </header>
  );
};

export default Navbar;

const Logo = ({ Icon, heading, onClick }) => {
  return (
    <Link to="/" onClick={onClick} className="flex gap-2 text-xl items-center">
      {Icon && <Icon />}
      <h1>{heading}</h1>
    </Link>
  );
};

const MobileNavbar = ({ mainNavigationItems, onClose }) => {
  return (
    <div onClick={() => onClose(false)} className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/40" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-0 right-0 bottom-0 w-7/12 sm:w-1/2 bg-white z-50"
      >
        <nav className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5">
            <Logo
              Icon={Atom}
              heading="kadv-ecomm"
              onClick={() => onClose(false)}
            />
            <X onClick={() => onClose(false)} className="cursor-pointer" />
          </div>

          <ul className="flex flex-col px-5">
            {mainNavigationItems.map(({ name, link }) => (
              <li key={link} className="py-2 border-b">
                <NavLink
                  to={link}
                  onClick={() => onClose(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black"
                      : "text-gray-500 hover:text-gray-700"
                  }
                >
                  <span>{name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const UserMenu = ({ userMenuItems, onClose }) => {
  return (
    <div
      id="user-dropdown-menu"
      role="menu"
      className="absolute right-0 pt-5 z-40"
    >
      <div className="flex flex-col text-sm gap-2 w-40 py-4 px-5 rounded border border-gray-400 text-gray-500 bg-white">
        {userMenuItems.map(({ name, link }) =>
          link ? (
            <Link
              key={link}
              to={link}
              onClick={() => onClose(false)}
              className="cursor-pointer hover:text-black"
            >
              {name}
            </Link>
          ) : (
            <button
              type="button"
              key={name}
              onClick={() => onClose(false)}
              className="p-0 bg-transparent border-0 flex items-center cursor-pointer hover:text-black"
            >
              {name}
            </button>
          ),
        )}
      </div>
    </div>
  );
};
