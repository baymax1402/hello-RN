/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Heading1, Heading2, Paragraph } from '../../widgets/Text.js'
import screen from '../../common/screen.js'
import system from '../../common/system.js'
import color from '../../widgets/color.js'

// create a component
class NearbyCell extends PureComponent {
    render() {
        let { info } = this.props
        let imageUrl = info.imgurl.replace('w.h', '160.0')
        // <Paragraph numberOfLines={0} style={{ marginTop: 8 }}>{info.subtitle}</Paragraph>
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress()}>
                <Image source={{ uri: imageUrl }} style={styles.icon} />

                <View style={styles.rightContainer}>
                    <Heading1>{info.title}</Heading1>
                    <Text style={{fontSize: 13,color: '#222', marginTop: 8}}>{info.subtitle}</Text>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Heading1 style={styles.price}>{info.price}元</Heading1>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: screen.onePixel,
        borderColor: color.border,
        backgroundColor: 'white',
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
    },
    price: {
        color: color.theme
    }
});

//make this component available to the app
export default NearbyCell;
