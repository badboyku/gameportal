import {memo} from 'react';
import {Link} from 'react-router-dom';

const AppNav = () => {
  return (
    <div>
      <span><Link to={`/`}>Home</Link></span>
      <span>&nbsp;-&nbsp;</span>
      <span><Link to={`/poker`}>Poker</Link></span>
    </div>
  );
};

export default memo(AppNav);
