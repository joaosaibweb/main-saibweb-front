import React, { useEffect, ReactNode } from 'react';
import dynamic from "next/dynamic";
/* eslint-disable */
import ReactDOM from 'react-dom';

/* pega no arquivo index.html a div com id modal e usa como container */
const modalContainer = document.getElementById('modal');
const el = document.createElement('div');

interface PropsDialogContainer {
  children: ReactNode;
}

function DialogContainer({ children }: PropsDialogContainer): JSX.Element {
  useEffect(() => {
    modalContainer?.appendChild(el);

    return () => {
      try {
        modalContainer?.removeChild(el);
      } catch (error) {
        // vazio
      }
    };
  }, []);

  return ReactDOM.createPortal(children, el);
}

export default DialogContainer;
