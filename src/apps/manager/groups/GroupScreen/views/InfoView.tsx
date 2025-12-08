import { Option, SelectedField } from '@/src/components/selects/SelectedField';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useStore } from '../../store';


export const InfoView = () => {
    const { group, coaches, coach_inx } = useStore();
    const { updateGroup, selectCoache } = useStore();

    const coachesNames: Option[] = coaches.map(el => ({"id": el.id, "name": el.first_name + ' ' +  el.last_name }));

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(group.name);
        setDescription(group.description ? group.description : '');
    }, [group]);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Group name: </Text>
                <TextInput style={styles.value} keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
                    value={name}
                    onChangeText={setName}
                    onBlur={() => updateGroup(name, description)}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Group coach:</Text>
                <SelectedField w={300}
                    data={coachesNames}
                    selectedIndex={coach_inx}
                    onSelect={selectCoache}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    section: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 4,
        width: '100%',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        //marginTop: 8,
    },
    label: {
        width: 150,
        color: '#ccc',
        fontSize: 16,
        //marginRight: 8,
        paddingVertical: 4
    },
    value: {
        color: '#444',
        fontSize: 15,
        paddingHorizontal: 12,
        paddingVertical: 6,
        //marginBottom: 4,
        height: 40,
        width: 200,
        borderRadius: 8,
        backgroundColor: 'rgb(180, 216, 158)',
        //minHeight: 28,
    },
    button: {
        height: 28,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        color: 'gold'
    },
});

