import { useState } from "react";
import { SystemCardLayout } from "./components/layout/SystemCardLayout";
import { Footer } from "./components/layout/Footer";
import { SystemLoader } from "./components/ui/SystemLoader";
import { SystemBackground } from "./components/layout/SystemBackground";
import { ConfirmExternalModal } from "./components/ui/ConfirmModal";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SystemBackground>
      {isLoading && <SystemLoader onLoadComplete={() => setIsLoading(false)} />}

      <div
        className={`
          portfolio-desktop-viewport

          min-h-dvh
          w-full

          flex
          flex-col

          items-center
          justify-between

          px-4
          py-4

          sm:px-6

          lg:px-8
          lg:py-4

          transition-opacity
          duration-700

          ${isLoading ? "opacity-0" : "opacity-100"}
        `}
      >
        <main
          id="main-content"
          className="
            flex
            min-h-0
            w-full
            flex-1
            items-center
            justify-center
          "
        >
          <SystemCardLayout />
        </main>

        <Footer />
      </div>
      <ConfirmExternalModal/>
    </SystemBackground>
  );
}

export default App;
