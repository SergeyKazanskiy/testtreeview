import { Icon } from '@/src/components/icons/CustomIcon';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Role, Team } from '../../model';
import { useStore } from '../../store';


interface Props {
  team: Team;
  role: Role;
  onAddStudents: () => void;
  onRemoveStudents: () => void;
}

export function TitleView({ team, role, onAddStudents, onRemoveStudents }: Props) {
  const { blockPlayersAdding } = useStore();
  const { setCurrentTeam, setCurrentRole } = useStore();

  const teamName = team + ' Team'

  return (
    <View style={team === Team.GREEN ? styles.firstTeam : styles.secondTeam}> 
      <View style={styles.container}>
        <Text style={styles.teamName}>{teamName}</Text>
        
        <View style={styles.wrapperAdd}>
          <Ionicons name='add-circle-outline' size={25} color='#333'
            disabled={blockPlayersAdding}
            onPress={() => (setCurrentTeam(team), setCurrentRole(role), onAddStudents())}
          />
        </View>
        
        <View style={styles.wrapperRemove}>
          <Icon name="delete" color='#A90F11' size={21}
            disabled={blockPlayersAdding}
            onPress={() => (setCurrentTeam(team), setCurrentRole(role), onRemoveStudents())}
          />
        </View>
        <Text style={styles.role}>Role: {role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  firstTeam: {
    backgroundColor: '#15803d',
  },
  secondTeam: {
    backgroundColor: '#A90F11',
  },
  teamName: {
    minWidth: 110,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  role: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  wrapperAdd: {
    backgroundColor: 'white',
    paddingVertical: 2,
    paddingHorizontal: 6,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#444'
  },
  wrapperRemove: {
    backgroundColor: '#ddd',
    padding: 6,

    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#444'
  },
});