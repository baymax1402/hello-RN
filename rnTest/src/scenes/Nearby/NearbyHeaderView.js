import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Paragragh} from '../../widgets/Text.js'
import color from '../../widgets/color.js'
import screen from '../../common/screen.js'

class NearbyHeaderView extends PureComponent {
    // 必传参数
    static defaultProps = {
        onSelected: () => {}
    };
    render(){
        return(
            <View style = {styles.container}>
                {this.props.titles.map((title, i) => (
                    <TouchableOpacity
                        style = {[{ backgroundColor: this.props.selectedIndex == i ? 'rgb(250, 59, 60)' : '#fff'},styles.item]} key={i} onPress={() => this.props.onSelected(i)}>
                        <Paragragh style = {{ color: this.props.selectedIndex == i ? '#fff' : '#555'}}>{this.props.titles[i]}</Paragragh>
                    </TouchableOpacity>
                ))}

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        width: screen.width / 4 - 10,
        marginLeft: 8,
        marginTop: 5,
        marginBottom: 5,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border

    }
})
export default NearbyHeaderView;
