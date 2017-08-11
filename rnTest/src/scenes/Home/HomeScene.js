
import React, { PureComponent } from 'react';
import { View,
         Text,
         StyleSheet,
         StatusBar,
         TouchableOpacity,
         Image
       } from 'react-native'
import color from '../../widgets/color.js'
import screen from '../../common/screen.js'
import system from '../../common/system.js'
import Common from '../../widgets/common.js'
import NavigationItem from '../../widgets/NavigationItem.js'
import { Paragragh,Heading2 } from '../../widgets/Text.js'
import HomeMenuView from './HomeMenuView'
import HomeGridView from './HomeGridView'
import SpacingView from '../../widgets/SpacingView.js'
import api from '../../service/api.js'
import datas from '../../service/datas.js'

class HomeScene extends PureComponent {
    // navigation
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <TouchableOpacity style= {styles.searchBar}>
                <Image source={ require('../../img/Home/search_icon.png')} style= {styles.searchIcon}/>
                <Paragragh>一点点</Paragragh>
            </TouchableOpacity>
        ),
        headerRight: (
            <NavigationItem icon={ require('../../img/Home/icon_navigationItem_message_white@2x.png') }
                onPress={() => {

                        }}/>
        ),
        headerLeft: (
            <NavigationItem title = { Common.home.leftItem }
                titleStyle={{ color: 'white' }}
                onPress={() => {

                }}
            />

        ),
        headerStyle: { backgroundColor: color.theme }
    });
    state: {
        discounts: Array,
        dataList: Array,
        refreshing: boolean
    };
    // 初始化数据
    constructor(props){
        super(props);
        this.state = {
            discounts: []
        };
    }
    // 组件挂载
    componentDidMount(){
        this.requestData();
    }
    // 请求数据
    requestData(){
        this.requestDiscounts();
    }
    // 获取折扣
    requestDiscounts(){
        api.getDiscounts().then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log('err:' + err);
        })
    }
    onMenuSelected(index: number) {
       alert(index)
    }
    render() {
        return (
            <View style={styles.container}>
                <HomeMenuView menuInfos={datas.menuInfo} onMenuSelected={this.onMenuSelected} />
                <SpacingView />
                <HomeGridView infos={this.state.discounts} onGridSelected={this.onGridSelected} />
                <SpacingView />
                <View style= {styles.recommendHeader}>
                    <Heading2>猜你喜欢</Heading2>
                </View>
            </View>
        );
    }
}

const styles = {
    container :{
        flex: 1,
        backgroundColor: color.background
    },
    searchBar: {
        width: screen.width * 0.7,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center'
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5
    }
}

export default HomeScene;
