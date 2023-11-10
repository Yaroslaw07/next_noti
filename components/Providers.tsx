import store from "@/lib/store";
import createEmotionCache from "@/lib/ui/emotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

const clientSideEmotionCache = createEmotionCache();

type ProvidersProps = {
  children?: React.ReactNode;
  emotionCache?: EmotionCache;
};

export const Providers = ({
  children,
  emotionCache = clientSideEmotionCache,
}: ProvidersProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <SessionProvider>{children}</SessionProvider>
    </CacheProvider>
  );
};
