import React from 'react';
import ReactDom from 'react-dom';

import Root from '@c/components/Root';
import configureStore from '@c/store/configureStore';

require("@c/assets/style/main.scss");

const store = configureStore();

ReactDom.render(
    <Root store={ store } />,
    document.getElementById('asd')
);