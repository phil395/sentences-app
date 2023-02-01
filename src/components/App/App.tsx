import { FC } from "react";
import { SentenceBox } from "../SentenceBox";

export const App: FC = () => {
  return (
    <>
      <main>
        <header>Header</header>

        <div className="container">
          <SentenceBox />
        </div>


      </main>
    </>
  );
};
