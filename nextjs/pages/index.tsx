import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [text, setText] = useState('');
  const worker = useRef<Worker>();

  useEffect(() => {
    worker.current = new Worker(
      // new URL('../util/Worker/name.worker.ts', import.meta.url)
      new URL('@util/Worker/name.worker.ts', import.meta.url)
    );
    worker.current.onmessage = (e: MessageEvent<string>) => {
      setText(e.data);
    };

    return () => {
      worker.current!.terminate();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    worker.current!.postMessage({ name: e.target.value });
  };

  return (
    <main className={styles.main}>
      <div>
        <input onChange={handleChange} />
        <p>{text}</p>
      </div>
    </main>
  );
};

export default Home;
