const Modal = ({
    children,
    isOpen,
    onClose,
  }: Readonly<{
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
  }>) => {
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div
            className={`fixed top-0 left-0 h-screen w-full bg-black/50 backdrop-blur-sm z-50 py-20 flex items-center justify-center ${
                isOpen ? 'block' : 'hidden'
            }`}
            onClick={handleModalClick}
        >
            {children}
        </div>
    ); 
}

export default Modal