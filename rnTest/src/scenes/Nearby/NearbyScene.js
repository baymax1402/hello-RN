
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import color from '../../widgets/color.js'

class NearbyScene extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text>NearbyScene</Text>
            </View>
        );
    }
}

const styles = {
    container :{
        flex: 1,
        backgroundColor: color.background
    }
}

export default NearbyScene
