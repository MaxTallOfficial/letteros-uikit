import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Контейнер Letteros: max-width 1280px, padding 0 20px.
 * На ≤767px — padding 0 10px (через media query).
 */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth: "var(--l-container-max, 1280px)",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      {children}
    </div>
  );
}
