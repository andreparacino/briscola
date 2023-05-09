import { ReactNode } from "react";

import styles from "./index.module.scss";

const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <button className={styles.Button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
