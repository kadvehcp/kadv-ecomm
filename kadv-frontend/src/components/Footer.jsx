import { Link } from "react-router-dom";
import { Atom } from "lucide-react";

const footerLinks = [
  {
    heading: "COMPANY",
    isInternal: true,
    links: [
      { name: "Home", to: "/" },
      { name: "About Us", to: "/about" },
      { name: "Delivery", to: "/delivery" },
      { name: "Privacy Policy", to: "/privacy-policy" },
    ],
  },
  {
    heading: "GET IN TOUCH",
    isInternal: false,
    links: [
      { name: "+91 7876271928", to: "https://wa.me/917876271928" },
      { name: "kadvehcp@gmail.com", to: "mailto:kadvehcp@gmail.com" },
      {
        name: "Chamba, Himachal Pradesh",
        to: "https://en.wikipedia.org/wiki/Chamba,_Himachal_Pradesh",
      },
      { name: "@kadvehcp", to: "https://github.com/kadvehcp/" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="py-10 border-t border-gray-400">
      <nav className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm text-gray-500">
        <div>
          <Atom className="mb-5 w-10 h-10 text-gray-700" />
          <p className="w-4/5">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
            dolorem et voluptatum laudantium!
          </p>
        </div>

        {footerLinks.map(({ heading, links, isInternal }) => (
          <div key={heading}>
            <h6 className="text-xl font-medium text-gray-700">{heading}</h6>
            <ul className="flex flex-col gap-1 mt-2">
              {links.map(({ name, to }) => (
                <li key={to}>
                  {isInternal ? (
                    <Link to={to} className="hover:text-gray-700">
                      {name}
                    </Link>
                  ) : (
                    <a
                      href={to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-700"
                    >
                      {name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <hr className="border-gray-400" />

      <p className="text-center text-xs text-gray-500 mt-5">
        kadv-ecomm © {new Date().getFullYear()} kadvehcp. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
