import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, ListView, InteractionManager, Button} from 'react-native';
import RefreshListView from '../../widgets/RefreshListView.js'
import RefreshState from '../../widgets/RefreshState.js'
import NavigationItem from '../../widgets/NavigationItem.js'
import color from '../../widgets/color.js'
import Separator from '../../widgets/Seperator.js'
import SpacingView from '../../widgets/SpacingView.js'
import { Heading1, HeadingBig, Paragragh, Heading2} from '../../widgets/Text.js'
import GroupPurchaseCell from '../../cells/GroupPurchaseCell.js'
import screen from '../../common/screen.js'
import api from '../../service/api.js'

class GroupPurchaseScene extends PureComponent {
    listView: ListView

    state: {
        info: Object,
        dataSource: ListView.DataSource
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '团购详情',
        headerStyle: { backgroundColor: 'white' },
        headerRight: (
            <NavigationItem
                icon = { require('../../img/Public/icon_navigationItem_share@2x.png') }
                onPress={()=>{

                }}
            />
        )

    });
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            info: {},
            dataSource: ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.listView.startHeaderRefreshing();
        });

    }
    // 头部组件
    renderHeader() {
        let info = this.props.navigation.state.params.info;

        return (
            <View>
                <View>
                    <Image style={styles.banner} source={{ uri: info.imgUrl.replace('w.h', '480.0')}}/>
                    <View style={styles.topContainer}>
                        <Heading1 style={{ color: color.theme }}>￥</Heading1>
                        <HeadingBig style={{ marginBottom: -8 }}>{info.price}</HeadingBig>
                        <Paragragh style={{ marginLeft: 10, color: '#666' }}>门市价:￥{(info.price) * 1.1.toFixed(0)}</Paragragh>
                        <View style={{flex: 1}}></View>
                        <Button title='立即抢购'
                                style={[{color: 'white', fontSize: 18},styles.buyButton]}
                                onPress={()=>{

                                }}
                        />
                    </View>
                </View>

                <Separator />
                <View>
                    <View style={styles.tagContainer}>
                        <Image style={{ width: 20, height: 20}} source={require('../../img/Home/icon_deal_anytime_refund.png')}/>
                        <Paragragh style={{ color: '#89b24f'}}>  随时退</Paragragh>
                        <View style={{flex: 1}} />
                        <Paragragh>已售{1234}</Paragragh>

                    </View>
                </View>
                <SpacingView />
                <View style={styles.tipHeader}>
                    <Heading2>看了本团购的用户还看了</Heading2>
                </View>


            </View>
        )
    }

    requestData(){
        this.requestRecommend();
    }

    requestDetail(){

    }
    requestRecommend(){

        let info = this.props.navigation.state.params.info;
        let self = this;
        api.getDetailRecommend(info.id).then((response)=>{
            let datas = response.data;
            let deals = datas.deals;
            let dataList = deals.map((info)=>{
                return {
                    id: info.id,
                    imgurl: info.imgurl,
                    title: info.brandname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price
                }
            });
            this.setState({
                ds: this.state.dataSource.cloneWithRows(dataList)
            });
            setTimeout(()=>{
                this.listView.endRefreshing(RefreshState.NoMoreData);
            }, 500);

        }).catch((err)=>{
            // console.log('err:'+err);
            this.listView.endRefreshing(RefreshState.Failure);
        });

    }
    // navigation
    render(){

        return (
            <View style={styles.container}>
                <RefreshListView
                    ref = {(e) => this.listView = e}
                    dataSource = { this.state.dataSource }
                    renderHeader = {()=> this.renderHeader()}
                    renderRow= {(rowData) =>
                        <GroupPurchaseCell
                            info = {rowData}
                            onPress = {() => this.props.navigation.navigate('GroupPurchase', {info: rowData})}
                        />
                    }
                    onHeaderRefresh={()=> this.requestData()}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    banner: {
        width: screen.width,
        height:screen.height * 0.5
    },
    topContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    tagContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    tipHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'

    },
    buyButton: {
        backgroundColor: '#fc9e28',
        width: 94,
        height: 36,
        borderRadius: 7
    }

})

export default GroupPurchaseScene;
