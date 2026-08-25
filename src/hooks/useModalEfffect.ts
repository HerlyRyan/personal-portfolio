// useModalEffect.ts — disederhanakan, TANPA history logic
import { useEffect, useRef } from 'react';

export const useModalEffect = (isOpen: boolean, onClose: () => void) => {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        document.body.style.overflow = 'unset';
      }, 700);
    };
  }, [isOpen]);
};