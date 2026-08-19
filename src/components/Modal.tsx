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
            <div className="w-[380px] bg-neutral-900 border border-white/10 p-6 rounded-2xl shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer text-2xl" onClick={onClose}>
                    &times;
                </button>
                { children }
                
            </div>
        </div>,
        
        document.body
    )
}