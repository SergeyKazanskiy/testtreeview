import { AchieveIcon } from '@/src/components/icons/AchieveIcon';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Achieve } from '../../model';


export type Props = {
    title: string;
    achieves: Achieve[];
    category: string;
};

export const AchievesWidget: React.FC<Props> = ({ title, achieves, category }) => {  
    const data = achieves.filter(achieve => achieve.category === category);

    return (
        <>
            <Text style={styles.title}>{title}</Text>

            <View style={[ styles.container]}>
                <FlatList horizontal
                    data={data} 
                    keyExtractor={(achieve) => achieve.id.toString()}
                    contentContainerStyle={styles.content}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) =>

                        <AchieveIcon onClick={() => {}}
                            size={72}
                            image={item.image}
                            label={item.name + ' x' + item.count}
                            level={1}
                        />
                    }
                />
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 120,
        borderRadius: 10,
        backgroundColor: 'rgba(45, 75, 10, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(110, 151, 6)'
    },
    content: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexGrow: 1
    },
    title: {
        color: '#F8E187',
        fontSize: 16,
        fontWeight: '400',
        paddingTop: 20,
        paddingBottom: 8
    }
});
