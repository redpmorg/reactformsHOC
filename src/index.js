import React, {Component} from 'react';
import {render} from 'react-dom';

import MyForm from './myform';

render(
  <MyForm/>,
  document.getElementById('app-wrapper')
);


if (module.hot) {
  module.hot.accept();
}
