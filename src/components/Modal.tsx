import { useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"

type ModalProps = {
    children: ReactNode
    onClose: () => void
}

export function Modal({ children, onClose }: ModalProps) {

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-5"
            onClick={onClose}>
            <div className="bg-white p-6 rounded shadow-lg relative"
                onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer text-2xl" onClick={onClose}>
                    &times;
                </button>
                { children }
                
            </div>
        </div>,
        
        document.body
    )
}