
//Library
import React, { PureComponent } from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'

import { Heading2 } from '../../widgets/Text'
import screen from '../../common/screen.js'
// create a component
class HomeMenuItem extends PureComponent {

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Image source={this.props.icon} resizeMode='contain' style={styles.icon}/>
                <Heading2>
                    {this.props.title}
                </Heading2>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 5,
        height: screen.width / 5
    },
    icon: {
        width: screen.width / 9,
        height: screen.width / 9,
        margin: 5
    }
});

export default HomeMenuItem;
