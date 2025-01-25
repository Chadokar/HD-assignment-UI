import { memo } from "react";

const Errorelement = (): JSX.Element => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a href="/" className=" text-accent">
        <button className="underline">Go back to home</button>
      </a>
    </div>
  );
};

export default memo(Errorelement);
