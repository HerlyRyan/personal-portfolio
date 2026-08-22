import { useState } from 'react';
import { SystemCardLayout } from './components/layout/SystemCardLayout';
import { Footer } from './components/layout/Footer';
import { SystemLoader } from './components/ui/SystemLoader';
import { SystemBackground } from './components/layout/SystemBackground';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SystemBackground>
      {/* Tampilkan System Loader saat pertama kali dimuat */}
      {isLoading && <SystemLoader onLoadComplete={() => setIsLoading(false)} />}

      {/* min-h-screen untuk mobile (bisa di-scroll jika sesak), md:h-screen md:overflow-hidden untuk desktop (terkunci) */}
      <div className={`min-h-screen md:h-screen w-full flex flex-col items-center justify-between py-6 md:py-4 md:overflow-hidden transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex-1 flex items-center justify-center w-full my-auto">
          <SystemCardLayout />
        </div>
        <Footer />
      </div>
    </SystemBackground>
  );
}

export default App;