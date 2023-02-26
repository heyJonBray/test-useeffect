/* eslint-disable no-template-curly-in-string */
import { useEffect, useState } from 'react';
import './App.css';

import { useFetch } from './useFetch';

/**
 * Calling a state setter to prevent constant re-rendering, using both a value
 * and a function.
 * Using a function to increment count prevents the useEffect from rendering
 * on every instance of the counter increasing.
 *
 * NOTE: Using 'count' as dependency causes constant useEffect re-rendering.
 *
 * @returns Count incrementing by the second.
 */
const useStopwatch = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('useStopwatch useEffect');
    const interval = setInterval(() => {
      /**
       * Calling state with a single value:
       */
      // console.log(`Count = ${count}`);
      // setCount(count + 1);
      /**
       * Calling state with a function:
       */
      //console.log(`Count = ${setCount}`);
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return count;
};

function App() {
  const [url, setUrl] = useState(null);
  const count = useStopwatch();
  const { data } = useFetch({ url, onSuccess: () => console.log('success') });

  console.log('App rendering');

  return (
    <div className="App">
      <div>Hello</div>
      <div>Count: {count}</div>
      <div>{JSON.stringify(data)}</div>
      <div>
        <button onClick={() => setUrl('bob.json')}>Bob</button>
        <button onClick={() => setUrl('sally.json')}>Sally</button>
      </div>
    </div>
  );
}

export default App;
