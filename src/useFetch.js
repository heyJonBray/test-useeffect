import { useState, useEffect, useRef, useLayoutEffect } from 'react';

export const useFetch = (options) => {
  const [data, setData] = useState(null);
  // Prevent re-rendering every time App.js
  // calls useFetch
  const savedOnSuccess = useRef(options.onSuccess);

  // Synchronous version of useEffect
  useLayoutEffect(() => {
    // Current saved status.
    savedOnSuccess.current = options.onSuccess;
  }, [options.onSuccess]);

  useEffect(() => {
    // Debug: Constant re-rendering.
    console.log('useFetch useEffect');
    // Debug: Rendering call to "null"
    if (options.url) {
      fetch(options.url)
        .then((response) => response.json())
        .then((json) => {
          // Ensure states are set.
          savedOnSuccess.current(json);
          setData(json);
        });
    }
  }, [options.url]);

  return {
    data,
  };
};
