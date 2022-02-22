import React, { DOMAttributes, MouseEventHandler, ReactChild } from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import {
  StyledModal,
  StyledModalBody,
  StyledModalHeader,
  StyledModalOverlay,
} from "./styles";

interface Imodal {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<Imodal> = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  // console.log(isBrowser)
  const [openModal, setopenModal] = useState(false)
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    show ? (
      document.body.style.overflow = "hidden"     
      ):(
      document.body.style.overflow = "auto"
    )
  }, [show])
  
  const handleCloseClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <h3>{title}</h3>
        <div className="modalContainer">
          <StyledModalHeader>
            <button className="closeButton" onClick={handleCloseClick}></button>
          </StyledModalHeader>
          <StyledModalBody>{children}</StyledModalBody>
        </div>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modalPortal")!
    );
  } else {
    return null;
  }
};

export default Modal;
