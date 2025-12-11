import { BACKEND_APP_IMAGES_URL } from '@/src/api/api';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useStore } from '../../store';


export const ProfileView = () => {
  const { student, camp_name, group_name } = useStore();
  const photoPath = student.photo === 'Student_boy.png' || student.photo === 'Student_girl.png' ?
  BACKEND_APP_IMAGES_URL + '/photos/' + student.photo :
  BACKEND_APP_IMAGES_URL + '/photos/' + camp_name + '/students/' + group_name + '/' + student.photo

  return (
    <View style={styles.container}>
      <View style={styles.left_group}>
        <Image source={{ uri: `${photoPath}` }} style={styles.avatar} />
      </View>

      <View style={styles.right_group}>
        <Text style={styles.name}>{student.first_name}</Text>
        <Text style={styles.name}>{student.last_name}</Text>
        <Text style={styles.name}>{student.gender}, {student.age} years old</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  left_group: {
    width: "30%"
  },
  right_group: {
    paddingLeft: 16,
    width: "70%"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  name: {
    color: '#444',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 4,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'rgb(180, 216, 158)',
  }
});

