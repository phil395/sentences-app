import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1', { cache: 'force-cache' })
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <hr />

      <pre>
        {data && JSON.stringify(data, null, 2)}
      </pre>

    </div>
  );
}

export default App;
