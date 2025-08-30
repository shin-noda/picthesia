import { useEffect, useState } from "react";

export const useGraceTime = (duration: number) => {
  const [isOutOfGraceTime, setIsOutOfGraceTime] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOutOfGraceTime(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isOutOfGraceTime;
};
