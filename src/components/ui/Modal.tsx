"use client";

import { CSSProperties, ReactNode } from "react";
import { colors } from "@/tokens";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Modal Letteros — as-is (modal--v1):
 * bg white, border-radius 20px, padding 40px
 * Overlay полупрозрачный
 * Close button в углу
 */

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1050,
};

const modalStyle: CSSProperties = {
  position: "relative",
  background: colors.bg.white,
  borderRadius: "20px",
  padding: "40px",
  maxWidth: "600px",
  width: "100%",
  maxHeight: "90vh",
  overflowY: "auto",
  fontFamily: "var(--l-font-family)",
};

const closeStyle: CSSProperties = {
  position: "absolute",
  top: "16px",
  right: "16px",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "20px",
  color: colors.text.main,
  lineHeight: 1,
};

export function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeStyle} onClick={onClose} aria-label="Закрыть">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
