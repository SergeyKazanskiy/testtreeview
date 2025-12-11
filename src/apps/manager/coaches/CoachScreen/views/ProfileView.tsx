import { BACKEND_APP_IMAGES_URL } from '@/src/api/api';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { useStore } from '../../store';


export const ProfileView = () => {
    const { coach, camp_name } = useStore();
    const { updateCoach } = useStore();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setFirstName(coach.first_name);
        setLastName(coach.last_name);
        setPhone(coach.phone);
        setEmail(coach.email);
    }, [coach]);
    
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Image source={{ uri: `${BACKEND_APP_IMAGES_URL + '/photos/' + camp_name + '/coaches/' + coach.photo}` }} style={styles.avatar} />

                <View style={styles.group}>
                    <Text style={styles.label}>First name</Text>
                    <TextInput style={styles.value} keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
                        value={firstName}
                        onChangeText={(text) => setFirstName(text.trim())}
                        onBlur={() => updateCoach({first_name: firstName})}
                    />
                    <Text style={styles.label}>Last name</Text>
                    <TextInput style={styles.value} keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
                        value={lastName}
                        onChangeText={(text) => setLastName(text.trim())}
                        onBlur={() => updateCoach({last_name: lastName})}
                    />
                </View>
            </View>

            <Text style={[styles.label, {width: 64}]}>Phone: </Text>
            <TextInput style={styles.value} keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
                value={phone}
                onChangeText={setPhone}
                onBlur={() => updateCoach({phone: phone})}
            />

            <Text style={[styles.label, {width: 64}]}>Email: </Text>
            <TextInput style={styles.value} keyboardType='name-phone-pad' maxLength={30} placeholder="Enter"
                value={email}
                onChangeText={setEmail}
                onBlur={() => updateCoach({email: email})}
            />
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
        //width: '100%',
    },
    group: {
        flex: 1,
        marginLeft: 16,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 4,
    },
    label: {
        color: '#F8E187',
        fontSize: 15,
        marginRight: 8,
    },
    value: {
        color: '#444',
        fontSize: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginBottom: 4,
        width: '100%',
        borderRadius: 8,
        backgroundColor: 'rgb(180, 216, 158)',
        minHeight: 30,
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

