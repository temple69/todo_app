import React, { ReactNode } from "react";
interface ParentComponentProps {
  children: ReactNode;
}
import styling from "./modal.module.css";
const Modal = ({ children }: ParentComponentProps) => {
  return <section className={styling.modal}>{children}</section>;
};

export default Modal;
