import createEmotionCache from "@/lib/ui/emotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { Session } from "inspector";
import { SessionProvider } from "next-auth/react";

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
