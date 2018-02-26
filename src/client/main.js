import React from 'react';
import ReactDom from 'react-dom';

import Root from '@/components/Root';
import configureStore from '@/store/configureStore';

require("@/assets/style/main.scss");

const store = configureStore();

ReactDom.render(
    <Root store={ store } />,
    document.getElementById('asd')
);