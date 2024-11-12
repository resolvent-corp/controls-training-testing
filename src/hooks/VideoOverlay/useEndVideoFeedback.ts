import { useCallback, useState } from "react";

interface useEndVideoFeedbackProps {
  videosCount: number;
}

const useEndVideoFeedback = ({ videosCount }: useEndVideoFeedbackProps) => {
  const [endVideosFeedback, setEndVideosFeedback] = useState<boolean[]>(
    new Array(videosCount).fill(false)
  );

  const handleSetEndVideoFeedback = useCallback(
    (index: number, value: boolean) => {
      setEndVideosFeedback((prevFeedback) => {
        const newFeedback = [...prevFeedback];
        newFeedback[index] = value;
        return newFeedback;
      });
    },
    []
  );

  return { endVideosFeedback, handleSetEndVideoFeedback };
};

export default useEndVideoFeedback;
