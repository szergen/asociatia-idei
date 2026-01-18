import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { headerStyles } from "./Header.styles";
import styles from "./Header.module.scss";
import { CartIcon } from "../shop/CartIcon";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => {
    // Get the path without query params or hash
    const currentPath = router.asPath.split("?")[0].split("#")[0];
    
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getLinkClassName = (path: string) => {
    return `${headerStyles.navLink} ${
      isActive(path) ? "text-blue-600 font-semibold border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"
    }`;
  };

  return (
    <header className={`${headerStyles.header} ${styles.header} ${className}`}>
      <div className={headerStyles.container}>
        <div className={headerStyles.flexContainer}>
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className={headerStyles.logo}>
              Asociația IDEI
            </Link>
          </div>

          {/* Navigation */}
          <nav className={headerStyles.nav}>
            <Link href="/" className={getLinkClassName("/")}>
              Acasă
            </Link>
            <Link href="/despre-noi" className={getLinkClassName("/despre-noi")}>
              Despre Noi
            </Link>
            <Link href="/proiecte" className={getLinkClassName("/proiecte")}>
              Proiecte
            </Link>
            <Link href="/evenimente" className={getLinkClassName("/evenimente")}>
              Evenimente
            </Link>
            <Link href="/shop" className={getLinkClassName("/shop")}>
              Shop
            </Link>
            <Link href="/contact" className={getLinkClassName("/contact")}>
              Contact
            </Link>
          </nav>

          <div className="mr-4">
            <CartIcon />
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center">
            <Link href="/implica-te" className={headerStyles.ctaButton}>
              E-Learning
            </Link>
            <Link href="/sustine" className={headerStyles.donateButton}>
              Susține
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className={headerStyles.mobileButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg
                  className={headerStyles.icon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className={headerStyles.icon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 flex flex-col border-t pt-4">
            <Link
              href="/"
              className={getLinkClassName("/")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Acasă
            </Link>
            <Link
              href="/despre-noi"
              className={getLinkClassName("/despre-noi")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Despre Noi
            </Link>
            <Link
              href="/proiecte"
              className={getLinkClassName("/proiecte")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Proiecte
            </Link>
            <Link
              href="/evenimente"
              className={getLinkClassName("/evenimente")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Evenimente
            </Link>
            <Link
              href="/shop"
              className={getLinkClassName("/shop")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className={getLinkClassName("/contact")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/implica-te"
              className={`${headerStyles.ctaButton} text-center mt-4 w-full block`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              E-Learning
            </Link>
            <Link
              href="/sustine"
              className={`${headerStyles.donateButton} text-center mt-2 w-full block ml-0`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Susține
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
