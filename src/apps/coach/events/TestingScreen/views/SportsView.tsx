import { BACKEND_APP_IMAGES_URL } from '@/src/constants/constants';
import { widgetStyles } from '@/src/styles/appStyles';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../../store';


export const SportsView = () => {
    const { exams, exam } = useStore();
    const { selectExam } = useStore();

    return (
        <View style={styles.container} >
            <FlatList horizontal
                data={exams}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.section}
                renderItem={({ item }) => {
                    const capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);
                    
                    return (
                        <TouchableOpacity onPress={() => selectExam(item)}>
                            <Image style={[styles.image, item === exam && styles.examSelected]} 
                                source={{ uri: `${BACKEND_APP_IMAGES_URL}/icons/tests/${capitalizedItem}.png` }} 
                            />
                            <Text style={widgetStyles.sport}>{item}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:6,
        alignSelf:'center'
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 4,
        marginBottom: 16
    },
    icon: {
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginBottom: -8,
    },
    examSelected: {
        marginTop: -8,
        height: 68,
        width: 68,
    }
});
