
import React, { PureComponent } from 'react';
import color from './widgets/color'
import Common from './widgets/common'
import {
    View,
    StatusBar,
    StyleSheet
} from 'react-native';

import HomeScene from './scenes/Home/HomeScene.js'
import NearbyScene from './scenes/Nearby/NearbyScene.js'
import OrderScene from './scenes/Order/OrderScene.js'
import MineScene from './scenes/Mine/MineScene.js'

import TabBarItem from './widgets/TabBarItem.js'

import {  StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

const lightContentScenes = ['Home', 'Mine']

function getCurrentRouteName(navigationState){
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

class RootScene extends PureComponent{
    constructor(){
        super();
        StatusBar.setBarStyle('light-content');
    }
    render() {
        return (
            <Navigator
                onNavigationStateChange = {
                    (prevState, currentState) => {
                        const currentScene = getCurrentRouteName(currentState);
                        const previousScene = getCurrentRouteName(prevState);
                        if (previousScene !== currentScene) {
                            if (lightContentScenes.indexOf(currentScene) >= 0) {
                                StatusBar.setBarStyle('light-content')
                            } else {
                                StatusBar.setBarStyle('dark-content')
                            }
                        }
                    }
                }
            />
        );
    }
}
// tab
const tab = TabNavigator(
    {
        Home: {
            screen: HomeScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: Common.tab.home,
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor = {tintColor}
                        focused = {focused}
                        normalImage = {require('./img/tabbar/pfb_tabbar_homepage@2x.png')}
                        selectedImage = {require('./img/tabbar/pfb_tabbar_homepage_selected@2x.png')}
                    />
                )
            })
        },
        NearBy: {
            screen: NearbyScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: Common.tab.nearBy,
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor = {tintColor}
                        focused = {focused}
                        normalImage = {require('./img/tabbar/pfb_tabbar_merchant@2x.png')}
                        selectedImage = {require('./img/tabbar/pfb_tabbar_merchant_selected@2x.png')}
                    />
                )
            })
        },
        Order: {
            screen: OrderScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: Common.tab.order,
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor = {tintColor}
                        focused = {focused}
                        normalImage = {require('./img/tabbar/pfb_tabbar_order@2x.png')}
                        selectedImage = {require('./img/tabbar/pfb_tabbar_order_selected@2x.png')}
                    />
                )
            })
        },
        Mine: {
            screen: MineScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: Common.tab.mine,
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor = {tintColor}
                        focused = {focused}
                        normalImage = {require('./img/tabbar/pfb_tabbar_mine@2x.png')}
                        selectedImage = {require('./img/tabbar/pfb_tabbar_mine_selected@2x.png')}
                    />
                )
            })
        }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: color.theme,
            inactiveTintColor: '#979797',
            style: { backgroundColor: '#ffffff' }
        }
    }


);

const Navigator = StackNavigator(
    {
        Tab: { screen: tab }
    },
    {
        navigationOptions: {
            // headerStyle: { backgroundColor: color.theme }
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
        }
    }
);


// 样式
const styles = {
    container: {
        flex: 1,
        backgroundColor: color.background
    }
}
export default RootScene;
