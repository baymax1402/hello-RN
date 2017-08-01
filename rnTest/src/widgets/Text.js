
import React from 'react';
import ReactNative, { StyleSheet, Dimensions, Text, ReactElement } from 'react-native'
import color from './color'


export function Heading2({style, ...props}: Object): ReactElement {
    return <Text style={[styles.h1, style]} {...props} />
}

export function Paragragh({style, ...props}: Object): ReactElement {
    return <Text style={[styles.p, style]} {...props} />
}


const styles = StyleSheet.create({
    h0: {
        fontSize: 40,
        color: color.theme
    },
    h1: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222'
    },
    h2: {
        fontSize: 14,
        color: '#222222'
    },
    p: {
        fontSize: 13,
        color: '#222'
    },
    tip: {
        fontSize: 13,
        color: '#999'
    }
})
