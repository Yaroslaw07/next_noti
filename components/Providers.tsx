import store from "@/lib/store/store";
import createEmotionCache from "@/lib/ui/emotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
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
      <Provider store={store}>{children}</Provider>
    </CacheProvider>
  );
};
