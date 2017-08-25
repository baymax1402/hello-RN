
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import color from './color'
import screen from '../common/screen.js'

// create a component
class Separator extends PureComponent {
    render() {
        return (
            <View style={[styles.line, this.props.style]} />
        )
    }
}

// define styles
const styles = StyleSheet.create({
    line: {
        width: screen.width,
        height: screen.onePixel,
        backgroundColor: color.border
    }
})

// make this component avaliable
export default Separator;
