import { useState } from 'react';
import './App.css';

import { useFetch } from './useFetch';

function App() {
  const [url, setUrl] = useState(null);
  const { data } = useFetch({ url, onSuccess: () => console.log('success') });

  console.log('App rendering');

  return (
    <div className="App">
      <div>Hello</div>
      <div>{JSON.stringify(data)}</div>
      <div>
        <button onClick={() => setUrl('bob.json')}>Bob</button>
        <button onClick={() => setUrl('sally.json')}>Sally</button>
      </div>
    </div>
  );
}

export default App;
