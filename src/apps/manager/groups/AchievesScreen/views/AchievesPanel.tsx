import { AchieveIcon } from '@/src/components/icons/AchieveIcon';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Achieve } from '../../model';


export type Props = {
  achieves: Achieve[];
  achieve_id: number;
  category: string;
  onClick: (id: number) => void;
};

export const AchievesPanel: React.FC<Props> = ({ achieves, achieve_id, category, onClick }) => {  
    const data = achieves.filter(achieve => achieve.category === category);

    return (
        <View style={[ styles.container]}>
            <FlatList horizontal
                data={data} 
                keyExtractor={(achieve) => achieve.image}
                contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1}}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (

                    <View style={ item.id === achieve_id && styles.selected }>
                        <AchieveIcon onClick={() => onClick(item.id)}
                            size={72}
                            image={item.image}
                            label={item.name}
                            level={1}
                            effect={item.effect}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 120,
        paddingLeft: 12,
        borderRadius: 10,
        backgroundColor: 'rgba(45, 75, 10, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(110, 151, 6)'
    },
    icon: {
        backgroundColor: 'red',
    },
    selected: {
        backgroundColor: 'rgb(110, 151, 6)',
    }
});
