import { RemixBrowser } from "@remix-run/react";
import { useState } from "react";
import { CacheProvider } from "@emotion/react";
import { hydrate } from "react-dom";

import { ClientStyleContext } from "./lib/chakra-context";
import createEmotionCache from "./lib/emotionCache";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache);

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

hydrate(
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>,
  document
);
