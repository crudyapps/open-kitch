import ReactDOM from "react-dom"
import React from "react";

const modalRoot = document.getElementById('modal-root');

export interface ModalProps {
    onClose: () => void;
}

export default function Modal(props: React.PropsWithChildren<ModalProps>) {
    const { onClose, children } = props;
    if (!modalRoot) {
        throw new Error("a div with id=modal-root must exits");
    }

    return ReactDOM.createPortal(
        (<div
            style={{
                position: 'absolute',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.3)',
            }}
            onClick={onClose}
        >
            <div
                style={{
                    padding: 20,
                    background: '#fff',
                    borderRadius: '5px',
                    display: 'inline-block',
                    minHeight: '20em',
                    position: 'relative',
                    minWidth: '30em',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                    justifySelf: 'center',
                }}
                onClick={(e) => { e.stopPropagation(); }}
            >
                {children}
            </div>
        </div>),
        modalRoot,
    )
}
