import { useState, useEffect, useRef, useLayoutEffect } from 'react';

// Prevent unnecessary rendering.
const useCallbackRef = (callback) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  return callbackRef;
};

export const useFetch = (options) => {
  const [data, setData] = useState(null);
  const savedOnSuccess = useCallbackRef(options.onSuccess);

  // useEffect with cleanup function.
  useEffect(() => {
    // @debug: rendering issues
    console.log('useFetch useEffect');
    if (options.url) {
      let isCancelled = false;
      fetch(options.url)
        .then((response) => response.json())
        .then((json) => {
          // Cleanup function check
          if (!isCancelled) {
            // Update and set current data
            savedOnSuccess.current?.(json);
            setData(json);
          }
        });
      return () => {
        isCancelled = true;
      };
    }
  }, [options.url]);

  return {
    data,
  };
};
