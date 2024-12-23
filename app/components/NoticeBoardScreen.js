import React, { useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';

const notices = [
    { id: '1', title: 'Exam Schedule Released', description: 'Check the exam schedule for next week.' },
    { id: '2', title: 'PTA Meeting', description: 'Parent-Teacher meeting on Friday.' },
];


const NoticeBoardScreen = () => {
    const renderItem = ({ item }) => (
        <Animated.View
            entering={SlideInLeft.delay(100 * parseInt(item.id))}
            exiting={SlideOutRight}
            style={styles.noticeItem}
        >
            <TouchableOpacity
                onPress={() => console.log("object")}
            >
                <Text style={styles.noticeTitle}>{item.title}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={notices}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}

export default NoticeBoardScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    noticeItem: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    noticeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});