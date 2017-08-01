
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
import { Paragragh } from '../../widgets/Text.js'
import HomeMenuView from './HomeMenuView'
import api from '../../service/api.js'

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
    })
    onMenuSelected(index: number) {
       alert(index)
    }
    render() {
        return (
            <View style={styles.container}>
                <HomeMenuView menuInfos={api.menuInfo} onMenuSelected={this.onMenuSelected} />
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
