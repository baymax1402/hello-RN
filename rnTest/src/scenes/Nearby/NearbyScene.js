
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image} from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { Paragragh } from '../../widgets/Text.js'
import color from '../../widgets/color.js'
import NavigationItem from '../../widgets/NavigationItem.js'
import screen from '../../common/screen.js'
import datas from '../../service/datas.js'
import NearbyListView from './NearbyListView.js'

class NearbyScene extends PureComponent {
    // navigation
    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <TouchableOpacity style = {styles.searchBar}>
                <Image source={ require('../../img/Home/search_icon.png')} style= {styles.searchIcon}/>
                <Paragragh style={styles.searchText}>找附近的吃喝玩乐</Paragragh>
            </TouchableOpacity>
        ),
        headerLeft: (
            <TouchableOpacity style = {styles.navigationLeftItem}>
                <Image source={ require('../../img/Public/icon_food_merchant_address@2x.png')} style= {styles.addressIcon}/>
                <Text style={styles.addressText}> 福州 鼓楼</Text>
            </TouchableOpacity>

        ),
        headerStyle: { backgroundColor: 'white' }
    });
    render(){
        let titles = datas.tabs;
        let types = datas.types;
        return(
            <ScrollableTabView
                style = {styles.container}
                tabBarBackgroundColor = 'white'
                tabBarActiveTextColor = 'rgba(242, 57, 87, 1.0)'
                tabBarInactiveTextColor = '#555'
                tabBarTextStyle = {styles.tabBarText}
                tabBarUnderlineStyle = {styles.tabBarUnderline}
            >
                {titles.map((title, i) => (
                    <NearbyListView
                        tabLabel={titles[i]}
                        key={i}
                        types={types[i]}
                        navigation = {this.props.navigation}
                    />

                ))}

            </ScrollableTabView>
        );
    }

}

const styles = {
    container :{
        flex: 1,
        backgroundColor: color.background
    },
    searchBar: {
        width: screen.width * 0.65,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        alignSelf: 'flex-end',
        marginRight: 20
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5
    },
    navigationLeftItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    addressIcon: {
        width: 13,
        height: 16
    },
    addressText: {
        fontSize: 15,
        color: '#333'
    },
    searchText: {
        color: '#333'
    },
    tabBarUnderline: {
        backgroundColor: 'rgb(242, 57, 87)'
    },
    tabBarText: {
        fontSize: 14,
        marginTop: 13
    }
}

export default NearbyScene;
