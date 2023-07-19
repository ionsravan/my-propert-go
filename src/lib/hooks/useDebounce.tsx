import { useState } from "react";

type SomeFunction = (...args: any[]) => void;
type Timer = ReturnType<typeof setTimeout>;

function useDebounce<Func extends SomeFunction>(func: Func, delay: number) {
  const [timer, setTimer] = useState<Timer>(); //Create timer state

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer); //Cancel previous timers
    setTimer(newTimer); //Save latest timer
  }) as Func;

  return debouncedFunction;
}

export default useDebounce;
