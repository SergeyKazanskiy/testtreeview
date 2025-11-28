import { Icon } from '@/src/components/icons/CustomIcon';
import { Modal, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Role, Team } from '../../model';
import { useStore } from '../../store';
import { FooterReport } from '../views/FooterReport';
import { RoundReport } from '../views/RoundReport';


function formatSec(s: number) {
    if (s) return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
    return `  -  :  -  `; // for second if only first round finished
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const GameReport = () => {
  const { gameDate, teams_totals, times_total, isGameReport, first_chaser_team } = useStore();
  const { hideGameReport } = useStore();

  const titleHeader = 'Dinivrey - ' + formatDate(gameDate)
   
   const role_2 =  first_chaser_team === Team.GREEN ? Role.CHASER : Role.EVADER
   const role_1 = role_2 === Role.CHASER ? Role.EVADER : Role.CHASER

  return (
    <Modal visible={isGameReport} animationType='fade'>
      <View  style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>  </Text>
          <Text style={styles.title}>Choose players to add</Text>
          <Icon size={20} color="#D1FF4D" name="close" onPress={hideGameReport} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.text}>Players - {teams_totals[0].amount} </Text>
            <Text style={styles.text}>Players - {teams_totals[1].amount} </Text>
          </View>
                
          <RoundReport round={1} time={formatSec(times_total[0])}
            role_1={role_1} total_1={teams_totals[1].freeded + '+' + teams_totals[1].survived}
            role_2={role_2} total_2={teams_totals[0].caught + '+' + teams_totals[0].bonus}
          />
          <RoundReport round={2} time={formatSec(times_total[1])}
            role_1={role_2} total_1={teams_totals[1].caught + '+' + teams_totals[1].bonus}
            role_2={role_1} total_2={teams_totals[0].freeded + '+' + teams_totals[0].survived}
          />
          <FooterReport/>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
      alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
      width: Platform.OS === 'web' ? 760 : undefined,
      maxHeight: Platform.OS === 'web' ? 360 : undefined,
      backgroundColor: '#152B52'
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    bottom: 8
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#ddd',
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
});
