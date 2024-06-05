import { memo } from 'react';
import type { FC } from 'react';

import classes from './App.module.css';
import resets from './components/_resets.module.css';
import { SignIn } from './components/SignIn/SignIn.js';

interface Props {
  className?: string;
}
export const App: FC<Props> = memo(function App() {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <SignIn />
    </div>
  );
});
