import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { MdClose } from "react-icons/md";
import Draggable, { ControlPosition, DraggableProps } from "react-draggable";

import { BaseModal, ModalContent, TitleBar, CModal } from "./styles";

interface DialogProps {
  isOpen: boolean;
  closeDialogFn: () => void;
  title: string;
  size: keyof typeof DIALOG_SIZE;
  isParent?: boolean;
  printMode?: boolean;
  children: ReactNode;
  // h1Align?: string;
  position?: { x: number; y: number };
}

interface DraggableRef {
  state: {
    x: number;
    y: number;
  };
}
const DIALOG_SIZE = {
  _300px: { width: "300px", height: "300px" },
  _350px: { width: "350px", height: "350px" },
  _450px: { width: "450px", height: "450px" },
  sm: { width: "600px", height: "500px" },
  md: { width: "800px", height: "700px" },
  lg: { width: "1000px", height: "900px" },
  xl: { width: "1200px", height: "1100px" },
};
/**
 * Este componente de dialog é destinado para exibir templates html.
 * @param {Boolean} isOpen Flag que indica quando o dialog será exibido
 * @param {Function} closeDialogFn Função responsável por fechar o dialog
 * @param {String} title Título do dialog
 * @param {String} size Tamanho do dialog (sm, md, lg)
 * @param {Boolean} isParent Use esta propriedade para sobrepor outro modal
 * @param {Boolean} printMode Esta propriedade faz o modal preencher quase todo o espaço verticalmente
 * @param {Element} children Template JSX que deve ficar entre as tags do dialog
 */
const Dialog = ({
  isOpen,
  closeDialogFn,
  title,
  size,
  isParent,
  printMode,
  children,
}: // h1Align,
DialogProps) => {
  const [haveEventListener, setEventListener] = useState(false);
  const draggableRef = useRef<any>(null);
  const DIALOG_SIZE = {
    _300px: "300px",
    _350px: "350px",
    _450px: "450px",
    sm: "32%",
    md: "65%",
    lg: "80%",
    xl: "96%",
  };

  const resetAndClose = useCallback((): void => {
    if (!draggableRef.current) return;

    draggableRef.current.state.x = 7;
    draggableRef.current.state.y = 7;

    closeDialogFn();
  }, [closeDialogFn, draggableRef]);

  const gerenciaOuvintes = useCallback((): (() => void) => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      setEventListener(true);
      if (e.key === "Escape" && isOpen) {
        resetAndClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      if (haveEventListener) {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [resetAndClose, haveEventListener, isOpen, setEventListener]);

  useEffect(() => {
    gerenciaOuvintes();
  }, [gerenciaOuvintes]);

  const getDialogSize = (): any => {
    const dialogSize = DIALOG_SIZE[size];
    return dialogSize;
  };
  return (
    <BaseModal isOpen={isOpen} isParent={isParent}>
      {/* {/ a propriedade bounds="parent" impede o dialog de ultrapassar as bordas da tela /} */}
      <Draggable
        handle="#draggable-dialog"
        defaultPosition={{ x: 7, y: 7 }}
        position={undefined}
        ref={draggableRef}
      >
        <ModalContent
          contentSize={getDialogSize}
          print={printMode}
          isParent={isParent}
        >
          <TitleBar wd="100%" id="draggable-dialog">
            <h1 style={{ width: "100%" }}>{title}</h1>
            <button type="button" onClick={resetAndClose}>
              <MdClose color="#61098a" />
            </button>
          </TitleBar>

          <CModal wd="100%" hg="170px" print={printMode}>
            {children}
          </CModal>
        </ModalContent>
      </Draggable>
    </BaseModal>
  );
};

export default Dialog;
