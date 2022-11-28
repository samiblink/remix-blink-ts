import { Portal } from "./portal";
import { useNavigate } from "@remix-run/react";

interface props {
    children: React.ReactNode
    isOpen: boolean
    ariaLabel?: string
    className?: string
}
// When the backdrop (anywhere off of the modal itself) is clicked, the user will be navigated to the /home route causing the modal to close.
export const Modal: React.FC<props> = ({ children, isOpen, ariaLabel, className}) => {
    const navigate = useNavigate();
    if (!isOpen) return null
    return (
        <Portal wrapperId="modal">
            <div
                className="fixed inset-0 overflow-y-auto bg-gray-600 bg-opacity-80"
                role="dialog"
                aria-labelledby={ariaLabel ?? "modal-title"}
                aria-modal="true"
                onClick={() => navigate("/home")}
            ></div>
            <div className="fixed inset-0 pointer-events-none flex justify-center items-center max-h-screen overflow-scroll">
                <div className={`${className} p-4 bg-gray-200 pointer-events-auto max-h-screen md:rounded-xl`}>
                    {children} 
                </div>
            </div>
        </Portal>
    )}