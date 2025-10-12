import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { layoutStyles } from "./Layout.styles";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  className = "",
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div className={`${layoutStyles.container} ${styles.layout} ${className}`}>
      {showHeader && <Header />}
      <main className={`${layoutStyles.main} ${styles.layout__main}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
