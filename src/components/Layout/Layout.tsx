import { memo, ReactNode } from "react";

import styles from "./Layout.module.css";

interface LayoutPropsI {
  children: ReactNode;
}

const Layout = ({ children }: LayoutPropsI) => {
  return <div className={styles.layout}>{children}</div>;
};

export default memo(Layout);
