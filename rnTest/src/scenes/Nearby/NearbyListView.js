import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ListView, ScrollView} from 'react-native';
import RefreshListView from '../../widgets/RefreshListView.js'
import RefreshState from '../../widgets/RefreshState.js'
import NearbyHeaderView from './NearbyHeaderView.js'
import NearbyCell from './NearbyCell.js'
import api from '../../service/api.js'

class NearbyListView extends PureComponent {
    listView: ListView
    state: {
        dataSource: ListView.DataSource,
        typeIndex: number
    }
    constructor(props){
        super(props);

        let datas = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: datas.cloneWithRows([]),
            typeIndex: 0
        };
    }
    componentDidMount() {
        this.listView.startHeaderRefreshing();
    }
    // 头部
    _renderHeader = () => {
        return (
            <NearbyHeaderView
                titles={this.props.types}
                selectedIndex={this.state.typeIndex}
                onSelected={(index)=>{
                    if (index != this.state.typeIndex) {
                        this.setState({ typeIndex: index })
                        this.listView.startHeaderRefreshing();
                    }
                }}
            />
        );
    }
    // 下方列表
    _renderRow = (data) => {
        return (
            <NearbyCell
                info={data}
                onPress={()=> {
                    this.props.navigate('GroupPurchase',{info: data})
                }}
            />
        );
    }
    // 请求数据
    requestData(){
        api.getRecommend().then((response) => {
            let datas = response.data;
            let self = this;
            let list = datas.map((info)=>{
                return {
                    id: info.id,
                    imgUrl: info.squareimgurl,
                    title: info.mname,
                    subtitle: `[${info.range}]${info.title}`,
                    // subtitle: info.title,
                    price: info.price
                }
            });
            list.sort(() => { return 0.5 - Math.random() });

            this.setState({dataSource: this.state.dataSource.cloneWithRows(list)});
            setTimeout(() => {
               this.listView.endRefreshing(RefreshState.NoMoreData);
           }, 500);
        }).catch((err) => {
            this.listView.endRefreshing(RefreshState.Failure);
        });
    }
    render(){
        return (
            <RefreshListView
                ref={(e) => this.listView = e}
                dataSource = { this.state.dataSource }
                renderHeader = {()=>
                    <NearbyHeaderView
                        titles={this.props.types}
                        selectedIndex={this.state.typeIndex}
                        onSelected={(index)=>{
                            if (index != this.state.typeIndex) {
                                this.setState({ typeIndex: index })
                                this.listView.startHeaderRefreshing();
                            }
                        }}
                    />
                }
                renderRow = {(rowData) =>
                    <NearbyCell
                        info={rowData}
                        onPress={() => {
                            this.props.navigation.navigate('GroupPurchase', { info: rowData })
                        }}
                    />}
                onHeaderRefresh = {() => this.requestData()}
            />
        );
    }
}

export default NearbyListView;
