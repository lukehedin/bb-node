import React from 'react';
import ReactDOM from 'react-dom';
import BountyResults from './BountyResults';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BountyResults />, div);
  ReactDOM.unmountComponentAtNode(div);
});
