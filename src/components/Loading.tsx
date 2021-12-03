import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const Loading = () => {
    return (
        <View style={ stylesSearch.activityContainer }>
            <ActivityIndicator size={ 50 } color="grey" />
            <Text>Cargando...</Text>
        </View>
    )
}

const stylesSearch = StyleSheet.create({
    activityContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default Loading
