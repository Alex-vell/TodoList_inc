 import React from 'react';
import App from "../app/App";
 import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import StoryRouter from 'storybook-react-router';

export default {
  title: 'App Stories',
  component: App,
  // argTypes: {},
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
}

export const AppBaseExample = (props: any) => {
    return (<App demo={true}/>)
}



