/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

export const useModalEffect = (
  isOpen: boolean, 
  onClose: () => void, 
  modalName: string = 'modal' // Parameter opsional untuk membedakan nama modal jika diperlukan
) => {
  useEffect(() => {
    if (!isOpen) return;

    // 1. Kunci scroll body
    document.body.style.overflow = 'hidden';

    // 2. Set URL Hash agar browser mencatatnya sebagai history entry navigasi
    // Contoh: URL berubah menjadi https://domain.com/#projects
    if (!window.location.hash.includes(modalName)) {
      window.location.hash = modalName;
    }

    // 3. Handle tombol Escape (Keyboard Desktop)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // 4. Handle navigasi Back / Swipe Back (Mobile & Browser History)
    // Ketika user swipe back, hash akan hilang/berubah, event hashchange terpanggil
    const handleHashChange = () => {
      if (!window.location.hash.includes(modalName)) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('window:hashchange' as any, handleHashChange); // Opsional jika custom event
    window.addEventListener('hashchange', handleHashChange);

    // Cleanup saat modal ditutup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);

      // Jika modal ditutup dari tombol internal (X / Esc / Tombol Close), 
      // bersihkan hash dari URL secara bersih tanpa meninggalkan jejak
      if (window.location.hash.includes(modalName)) {
        // Mundur satu langkah riwayat hash agar URL kembali bersih ke home
        window.history.back();
      }

      // Beri jeda sedikit lebih lama dari durasi transisi agar scroll aman
      setTimeout(() => {
        document.body.style.overflow = 'unset';
      }, 700); 
    };
  }, [isOpen, onClose, modalName]);
};