import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { useCallback, useLayoutEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { useStore } from '../store';
import { ChartsView } from './views/ChartsView';
import { HeaderView } from './views/HeaderView';


interface Props {
  logout: () => void;
}

export default function StatisticsScreen({ logout }: Props) {
  const { student_id } = useStore();
  const { togleStatistic, loadLimitTests } = useStore();

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadLimitTests(student_id, 3);
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
        <Pressable style={{ marginRight: 15 }} onPress={togleStatistic} >
          <Ionicons name='repeat-outline' size={21} color="#D1FF4D" />
        </Pressable>
    });
  }, [navigation]);

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.background} >
      <ScrollView style={{paddingBottom: 200}} showsVerticalScrollIndicator={false}>
        <HeaderView/>

        <ChartsView/>

        <Text style={{color: 'red', fontSize: 18, fontWeight: 600, alignSelf: 'center', paddingTop: 16}}
          onPress={logout}>
          Logout
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
  },
  navButton: {
    color: '#D1FF4D',
    fontSize: 15,
  },
  metric: {
    color: 'gold',
    fontSize: 15,
    fontWeight: 400,
    left: 26,
    paddingTop: 10
  },
  comment: {
    marginTop: 'auto', 
    textAlign: 'center',
    paddingBottom: 20
  },
});

//<Text style={styles.navButton}>{isTests ? 'Test' : 'Game'}</Text>