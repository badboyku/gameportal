import { memo } from 'react';
import './styles.css';

type Props = {};

const HelloWorld = (_props: Props) => {
  return <div className="hello-world">Hello World!</div>;
};

export default memo(HelloWorld);
