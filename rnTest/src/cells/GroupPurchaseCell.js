// import libraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Heading1, Paragragh } from '../widgets/Text.js'
import screen from '../common/screen.js'
import color from '../widgets/color.js'

class GroupPurchaseCell extends PureComponent {

    render(){
        let info = this.props.info;
        let imageUrl = info.imgurl.replace('w.h', '160.0');

        return (
            <TouchableOpacity style={styles.container} onPress={()=> this.props.onPress(info)}>
                <Image source = {{ uri: imageUrl}} style = {styles.icon}/>
                <View style={styles.rightContainer}>
                    <Heading1>{info.title}</Heading1>
                    <Paragragh numberOfLines={0} style={{ marginTop: 8 }}>{info.subtitle}</Paragragh>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Heading1 style={styles.price}>{info.price}元</Heading1>
                    </View>
                </View>
            </TouchableOpacity>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: screen.onePixel,
        borderColor: color.border,
        backgroundColor: 'white'

    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 5
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10
    },
    price: {
        color: color.theme
    }
})
export default GroupPurchaseCell;
