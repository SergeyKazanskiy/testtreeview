import { CustomNavbar } from '@/src/components/bars/CustomNavbar';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
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
  const { isHeader, currentRound, gameStep, isEvadersDialog } = useStore();
  const { currentTeam, pointsDifference, winner } = useStore();
  const { loadStudents, onNavbarBack, hideBackAlert, onErrorExit, step_on_settings, clearPlayers} = useStore();
  const { onFixPoints, switch_on_completion, hideCheckingAlert, setGamingScreen } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadStudents();
      step_on_settings();
    }, [])
  );

  function handleBack() {
    if (gameStep === 'Settings') {
      clearPlayers();
      returnBack();
    } else {
      onNavbarBack();
    }
  }

  function handleFinishGame() {
    step_on_settings();
    returnBack();
  }

  const returnBack = () => {
    setGamingScreen(false);
    onBack();
  };

  return (        
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <Stack.Screen options={{ headerShown: false }} />
      <CustomNavbar title='Dinivrey - Game Mode' onClick={handleBack}>
        <HeaderView/>
      </CustomNavbar>

      {/* Alerts */}
      <BackAlert
        onBack={() => (setGamingScreen(false), returnBack(), onErrorExit())}
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
    gap: 1,
  },
  section: {
    flex: 1,
    width: '50%',
  }
});