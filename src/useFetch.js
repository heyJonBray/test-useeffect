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

  useEffect(() => {
    // @debug: rendering issues
    console.log('useFetch useEffect');
    if (options.url) {
      fetch(options.url)
        .then((response) => response.json())
        .then((json) => {
          // Update and set current data
          savedOnSuccess.current?.(json);
          setData(json);
        });
    }
  }, [options.url]);

  return {
    data,
  };
};
