import { useEffect } from 'react';

export const useModalEffect = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!isOpen) return;

    // 1. Kunci scroll body
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // 2. Cleanup dengan delay
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      
      // Beri jeda sedikit lebih lama dari durasi loadingPath (600ms)
      // agar scroll tidak terbuka saat loading overlay masih tampil
      setTimeout(() => {
        document.body.style.overflow = 'unset';
      }, 700); 
    };
  }, [isOpen, onClose]);
};