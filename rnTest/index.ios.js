/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import { AppRegistry } from 'react-native';

import RootScene from './src/rootScene';

export default class rnTest extends PureComponent {
  render() {
    return (
        <RootScene />
    );
  }
}

AppRegistry.registerComponent('rnTest', () => rnTest);
