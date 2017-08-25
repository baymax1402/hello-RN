
import React, { PureComponent } from 'react';
import { View,
         Text,
         StyleSheet,
         StatusBar,
         TouchableOpacity,
         Image,
         FlatList
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
import GroupPurchaseCell from '../../cells/GroupPurchaseCell.js'

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
            discounts: [],
            dataList: [],
            refreshing: false
        };
    }
    // 组件挂载
    componentDidMount(){
        this.requestData();
    }
    // 请求数据
    requestData(){
        this.setState({ refreshing: true });
        // 获取折扣推荐
        this.requestDiscounts();
        // 获取猜你喜欢
        this.requestRecommend();
    }
    // 获取折扣
    requestDiscounts(){
        let self = this;
        api.getDiscounts().then((response) => {
            let datas = response.data;
            self.setState({ discounts: datas });
            // self.setState({ refreshing: false});
        }).catch((err) => {
            console.log('err:' + err);
        })

    }
    // 获取猜你喜欢的推荐
    requestRecommend(){
        let self = this;
        api.getRecommend().then((response) => {
            let datas = response.data;
            let list = datas.map((info)=>{
                return {
                    id: info.id,
                    imgurl: info.imgurl,
                    title: info.brandname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price
                }
            })
            self.setState({ dataList: list });
            self.setState({ refreshing: false });
        }).catch((err) => {
            console.log('err:' + err);
        });
    }
    // 点击上方菜单
    onMenuSelected(index) {
       console.log(index);
    }
    // 点击折扣推荐
    onGridSelected(info) {
        //此处不能使用this.state
        console.log(info);

    }
    onCellSelected(info) {
        // this.props.navigation.navigate('GroupPurchase', { info: info });
    }
    // 头部渲染组件
    _renderHeader = () => {
        return(
            <View>
                <HomeMenuView menuInfos={datas.menuInfo} onMenuSelected={(this.onMenuSelected)} />
                <SpacingView />
                <HomeGridView infos={this.state.discounts} onGridSelected={(this.onGridSelected)} />
                <SpacingView />
                <View style= {styles.recommendHeader}>
                    <Heading2>猜你喜欢</Heading2>
                </View>
            </View>
        )
    }
    // 获取下方猜你喜欢列表对应key值
    keyExtractor(item, index){
        return item.id;
    }
    // 获取下方猜你喜欢列表对应组件
    _renderCell = (info) => {
        return (
            <GroupPurchaseCell info={info.item} onPress={this.onCellSelected} />
        )

    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <FlatList
                    data = {this.state.dataList}
                    keyExtractor = {this.keyExtractor}
                    onRefresh = {this.requestData}
                    refreshing = {this.state.refreshing}
                    ListHeaderComponent = {this._renderHeader}
                    renderItem = {this._renderCell}
                />
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
    },
    recommendHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    }
}

export default HomeScene;
