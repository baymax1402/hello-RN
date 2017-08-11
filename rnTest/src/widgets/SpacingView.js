
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import color from './color'

// create a component
class SpacingView extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

// define your StyleSheet
const styles = StyleSheet.create({
    container: {
        height: 14,
        backgroundColor: color.background
    }
});

// make this component available to the app
export default SpacingView;
