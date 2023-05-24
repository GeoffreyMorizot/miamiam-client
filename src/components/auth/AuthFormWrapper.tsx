import { PropsWithChildren } from "react";
import styles from "./Auth.module.scss";

interface AuthFormWrapperProps extends PropsWithChildren {
  title: string;
}

export function AuthFormWrapper({ children, title }: AuthFormWrapperProps) {
  return (
    <div className={styles.authForm}>
      <div className={styles.formWp}>
        <h1 className={styles.authFormTitle}>{title}</h1>
        {children}
      </div>
    </div>
  );
}
