import { useState, useCallback } from "react";

const useCopyToClipboard = (resetDelay = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, resetDelay);

        return true;
      } catch (_error) {
        setIsCopied(false);
        return false;
      }
    },
    [resetDelay],
  );

  return { onCopy, isCopied };
};

export default useCopyToClipboard;
