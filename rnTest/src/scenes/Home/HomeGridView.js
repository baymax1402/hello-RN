
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import color from '../../widgets/color.js';
import screen from '../../common/screen.js';
import system from '../../common/system.js';
import HomeGridItem from './HomeGridItem.js'

// create a component
class HomeGridView extends PureComponent {
    static defaultProps = {
        infos: []
    };

    render() {
        return (
            <View style={styles.container}>
                {this.props.infos.map((info, index)=>(
                    <HomeGridItem
                        info = {info}
                        key = {index}
                        onPress = {() => this.props.onGridSelected(info)}/>

                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderTopWidth: screen.onePixel,
        borderLeftWidth: screen.onePixel,
        borderColor: color.border
    }
});

export default HomeGridView;
