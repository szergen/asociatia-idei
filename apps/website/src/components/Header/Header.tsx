import React from "react";
import Link from "next/link";
import { headerStyles } from "./Header.styles";
import styles from "./Header.module.scss";
import { CartIcon } from "../shop/CartIcon";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
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
            <Link href="/" className={headerStyles.navLink}>
              Acasă
            </Link>
            <Link href="/despre-noi" className={headerStyles.navLink}>
              Despre Noi
            </Link>
            <Link href="/proiecte" className={headerStyles.navLink}>
              Proiecte
            </Link>
            <Link href="/evenimente" className={headerStyles.navLink}>
              Evenimente
            </Link>
            <Link href="/shop" className={headerStyles.navLink}>
              Shop
            </Link>
            <Link href="/contact" className={headerStyles.navLink}>
              Contact
            </Link>
          </nav>

          <div className="mr-4">
            <CartIcon />
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link href="/implica-te" className={headerStyles.ctaButton}>
              Implică-te
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className={headerStyles.mobileButton}>
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
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
