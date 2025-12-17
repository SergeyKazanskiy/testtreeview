import { Button } from '@/src/components/buttons/CustomButton';
import { Icon } from '@/src/components/icons/CustomIcon';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Player } from '../../model';
import { useStore } from '../../store';
import { RemoveAlert } from '../alerts/RemoveAlert';


type Props = {
  onBack:() => void;
}

export function RemovingPopup({onBack}: Props) {
  const COLUMN_HEIGHT = 5;

  const { playersToRemove, players, currentTeam } = useStore();
  const { removePlayers, confirmRemovePlayer, showRemoveAlert, hideRemoveAlert } = useStore();

  const columns: Player[][] = [];
  const teamPlayers = players.filter(el => el.team === currentTeam)

  for (let i = 0; i < teamPlayers.length; i += COLUMN_HEIGHT) {
    columns.push(teamPlayers.slice(i, i + COLUMN_HEIGHT));
  }

  const [name, setName] = useState('');
  const [playerId, setPlayerId] = useState(0);

  const handleSelect = (id: number, name: string) => {
    setPlayerId(id);

    if (playersToRemove.includes(id)) {
      confirmRemovePlayer(id);
    } else {
      setName(name);
      showRemoveAlert();
    }
  }

  const handleRemove = () => {
    confirmRemovePlayer(playerId);
    closeAlert();
  }

  const closeAlert = () => {
    hideRemoveAlert();
    setName('');
    setPlayerId(0);
  }

  return (
    <View  style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>  </Text>
        <Text style={styles.title}>Remove players</Text>
        <Icon size={20} color="#D1FF4D" name="close" onPress={onBack} />
      </View>

      {columns.length === 0 && <Text style={styles.text}>No available students</Text>}

      <RemoveAlert name={name} onCancel={closeAlert} onRemove={handleRemove}/>

      <ScrollView horizontal contentContainerStyle={styles.rowScroll} showsVerticalScrollIndicator={false}>
        {columns.map((column, colIndex) => (

          <View key={`column3-${colIndex}`} style={styles.column}>
            {column.map((player) => {
              const isSelected = playersToRemove.includes(player.id);

              return (
                <Pressable key={`player-${player.id}`}
                  style={[styles.cell, { backgroundColor: isSelected ? '#ef4444' : 'white'}]}
                  onPress={() => handleSelect(player.id, player.name)}
                >
                  <View style={styles.cellContent}>
                    <Text style={styles.playerName}>
                      {player.name} | {player.age}
                    </Text>
                    <Icon name="x-circle" color='#555'/>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {columns.length > 0 && 
        <View style={styles.buttonRow}>
          <Button
            title="REMOTE"
            buttonStyle={styles.removeBtn}
            onPress={() => (removePlayers(), onBack())}
          />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
      width: '100%',
      backgroundColor: '#152B52'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingVertical: 5,
    padding: 20
  },
  title: {
    fontSize: 22,
    color: '#D1FF4D',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingTop: 12
  },
  rowScroll: {
    paddingBottom: 16,
  },
  column: {
    marginHorizontal: 8,
  },
  cell: {
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: 180,
    justifyContent: 'center',
  },
  cellContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerName: {
    color: '#222',
    flexShrink: 1,
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 4,
    margin: 12,
  },
  removeBtn: {
    backgroundColor: '#ef4444',
    borderRadius: 24,
    paddingHorizontal: 24,
  },
});