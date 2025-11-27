import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Achieve, Achievement } from '../../model';
import { AchieveIcon } from '../components/AchieveIcon';


export type Props = {
    achieves: Achieve[] | Achievement[];
};

export const AchievesPanel: React.FC<Props> = ({ achieves }) => {  
    return (
        <>
            {achieves.length === 0 && <Text style={styles.emptyLabel}>No achievements</Text>}
            {achieves.length > 0 &&
                
                <View style={styles.section}>
                    {achieves.map((item) => {
                        const level = "level" in item ? item.level : 1;
                        const progress = "progress" in item ? item.progress : 1;

                        return (
                            <AchieveIcon key={item.id}
                                image={item.image}
                                label={item.name}
                                level={level?? 1}
                                percent={progress?? 0}
                            />
                        );
                    })}
                </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 24,
        columnGap: 36,
    },
    icon: {
        backgroundColor: 'red',
    },
    emptyLabel: {
        paddingTop: 80,
        color: '#ddd',
        fontSize: 16,
        alignSelf: 'center'
    },
});
