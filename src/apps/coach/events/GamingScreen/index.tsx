import { CustomNavbar } from '@/src/components/bars/CustomNavbar';
import { formatDateTime } from '@/src/utils/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Student } from '../model';
import { useStore } from '../store';
import { BackAlert } from './alerts/BackAlert';
import { CheckingAlert } from './alerts/CheckingAlert';
import { GameOverAlert } from './alerts/GameOverAlert';
import { AddNewDialog } from './dialogs/AddNewDialog';
import { EvadersDialog } from './dialogs/EvadersDialog';
import { TimeSetter } from './dialogs/TimeSetter';
import { GameReport } from './popups/GameReport';
import { FooterView } from './views/FooterView';
import { HeaderView } from './views/HeaderView';
import { PlayersView } from './views/PlayersView';
import { TitleView } from './views/TitleView';


type Props = {
  onBack: () => void;
  onAddStudents: () => void;
  onRemoveStudents: () => void;
}

export default function GamingScreen({ onBack, onAddStudents, onRemoveStudents }: Props) {
  const { isHeader, currentRound, attendances, gameStep, gameDate, isEvadersDialog } = useStore();
  const { currentTeam, pointsDifference, winner } = useStore();
  const { setAvailableStudents, onNavbarBack, hideBackAlert, onErrorExit, step_on_settings, clearPlayers} = useStore();
  const { onFixPoints, switch_on_completion, hideCheckingAlert } = useStore();

  useEffect(() => { // ???
    const availables = attendances.filter(el => el.present === true);
    const students: Student[] = availables.map(el => ({
      id: el.student_id,
      first_name: el.first_name,
      last_name: el.last_name,
      age: 8,
    }));
    setAvailableStudents(students);
    step_on_settings();
  }, [])

  function handleBack() {
    if (gameStep === 'Settings') {
      clearPlayers();
      setTimeout(onBack, 300);
    } else {
      onNavbarBack();
    }
  }

  function handleFinishGame() {
    step_on_settings();
    setTimeout(onBack, 300);
  }

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <CustomNavbar title={formatDateTime(gameDate).date + ', Game Mode'} onClick={handleBack}>
        <HeaderView/>
      </CustomNavbar>

      {/* Alerts */}
      <BackAlert
        onBack={() => (onBack(), onErrorExit())}
        onCancel={hideBackAlert}
      />
      <GameOverAlert
        team={winner}
        onNo={handleFinishGame}
        onYes={step_on_settings}
      />
      <CheckingAlert
        team={currentTeam}
        points={pointsDifference}
        onFixPoints={onFixPoints}
        onGoBack={()=>(hideCheckingAlert(), switch_on_completion())}
      />

      {/* Modals */}
      <TimeSetter/>
      <GameReport/>
      <AddNewDialog/>
      
      {/* Main */}
      {isEvadersDialog && <EvadersDialog/>} 

      {!isEvadersDialog && <View style={styles.row}>
        <View style={styles.section}>
          {isHeader &&
            <TitleView
              team={currentRound.teams[0].team}
              role={currentRound.teams[0].role}
              onAddStudents={onAddStudents}
              onRemoveStudents={onRemoveStudents}
            />
          }
          <PlayersView team={currentRound.teams[0].team}
                        role={currentRound.teams[0].role} />
        </View>
        <View style={styles.section}>
          {isHeader && 
            <TitleView
              team={currentRound.teams[1].team}
              role={currentRound.teams[1].role}
              onAddStudents={onAddStudents}
              onRemoveStudents={onRemoveStudents}
            />
          }
          <PlayersView team={currentRound.teams[1].team}
                        role={currentRound.teams[1].role} />
        </View>
      </View> }

      {!isHeader && !isEvadersDialog && <FooterView/>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 1
  },
  section: {
    flex: 1,
    width: '50%',
  }
});