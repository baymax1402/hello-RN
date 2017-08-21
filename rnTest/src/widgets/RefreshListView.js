import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, RefreshControl, ListView, ActivityIndicator, TouchableOpacity} from 'react-native';
import RefreshState from './RefreshState.js'
class RefreshListView extends PureComponent {
    static propTypes = {
       onHeaderRefresh: React.PropTypes.func,
       onFooterRefresh: React.PropTypes.func
    }
    static defaultProps = {
        footerRefreshingText: '数据加载中...',
        footerFailureText: '点击重新加载',
        footerNoMoreDataText: '已加载全部数据'
    };
    // 初始化state
    constructor(props){
        super(props);
        this.state = {
            headerState: RefreshState.Idle,
            footerState: RefreshState.Idle
        }
    }
    headerState() {
        return self.state.headerState
    }

    footerState() {
        return self.state.footerState
    }
    startHeaderRefreshing(){
        this.setState({ headerState: RefreshState.Refreshing});
        this.props.onHeaderRefresh && this.props.onHeaderRefresh();
    }
    startFooterRefreshing(){
        this.setState({ footerState: RefreshState.Refreshing});
        this.props.onFooterRefresh && this.props.onFooterRefresh();
    }
    endRefreshing(refreshState){
        if (refreshState == RefreshState.Refreshing){
            return;
        }
        let footerState = refreshState;
        if (this.props.dataSource.getRowCount() == 0){
            footerState = RefreshState.Idle;
        }
        this.setState({
            headerState: RefreshState.Idle,
            footerState: footerState
        })
    }
    // 判断头部是否开始刷新
    shouldStartHeaderRefreshing(){
        if (this.state.headerState == RefreshState.Refreshing ||
            this.state.footerState == RefreshState.Refreshing)
        {
            return false;
        }
        return true;
    }
    // 判断底部是否开始加载
    shouldStartFooterRefreshing(){
        if (this.state.headerState == RefreshState.Refreshing ||
            this.state.footerState == RefreshState.Refreshing)
        {
            return false;
        }
        if (this.state.headerState == RefreshState.Failure ||
            this.state.footerState == RefreshState.NoMoreData)
        {
            return false;
        }
        if (this.props.dataSource.getRowCount() == 0)
        {
            return false;
        }
        return true;

    }
    // 头部刷新
    onHeaderRefresh(){
        if (this.shouldStartHeaderRefreshing){
            this.startHeaderRefreshing();
        }

    }
    // 尾部加载
    onFooterRefresh(){
        if (this.shouldStartFooterRefreshing){
            this.startFooterRefreshing();
        }
    }

    // 渲染
    render(){
        return (
            <ListView
                {...this.props}
                enableEmptySections
                refreshControl = {
                    <RefreshControl
                        refreshing = {this.state.headerState == RefreshState.Refreshing}
                        onRefresh = {this.onHeaderRefresh}
                        tintColor = 'gray'
                    />
                }
                renderFooter = {this.renderFooter}
                onEndReachedThreshold = {10}
                onEndReached = {this.onFooterRefresh}
            />
        );
    }
    // footer
    renderFooter= ()=> {
        let footer = null;

        switch(this.state.footerState){
            case RefreshState.Idle:
                break;
            case RefreshState.Failure: {
                // 重新加载
                footer =
                    <TouchableOpacity style = {styles.footerContainer} onPress = {()=> this.startFooterRefreshing()}>
                        <Text style = {styles.footerText}>{this.props.footerRefreshingText}</Text>
                    </TouchableOpacity>
                break;
            }
            case RefreshState.Refreshing: {
                // loading
                footer =
                    <View style = {styles.footerContainer} >
                        <ActivityIndicator size = "small" color = "#888" />
                        <Text style={styles.footerText}>
                            {this.props.footerRefreshingText}
                        </Text>
                    </View>
                break;
            }
            case RefreshState.NoMoreData: {
                // 没有更多数据
                footer =
                    <View style = {styles.footerContainer}>
                        <Text style={styles.footerText}>{this.props.footerNoMoreDataText}</Text>
                    </View>
                break;

            }
        }
        return footer;
    }
}
const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    footerText: {
        fontSize: 14,
        color: '#555'
    }
});
export default RefreshListView;
