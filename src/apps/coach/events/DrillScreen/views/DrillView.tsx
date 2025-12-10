import { LinearGradient } from 'expo-linear-gradient';
import { Platform, StyleSheet, Text } from 'react-native';
import { useStore } from '../../store';
import YoutubeView from './YoutubeView';


export function DrillView() {
  const { drill } = useStore();

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <YoutubeView source={drill.link} />

      <Text style={styles.label}>Category</Text>
      <Text style={styles.text}>{drill.category}</Text>

      <Text style={styles.label}>Estimate time duration:</Text>
      <Text style={styles.text}>{drill.time}</Text>

      <Text style={styles.label}>Players amount during drill:</Text>
      <Text style={styles.text}>{drill.actors}</Text>

      <Text style={styles.label}>Description</Text>
      <Text style={styles.textArea}>{drill.desc}</Text>
    </LinearGradient>
  );    
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    height: '100%',
    padding: 16
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F8E187',
    paddingTop: 12,
    paddingBottom: 6,
  },
  textArea: {
    borderRadius: 8,
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    padding: 10,
    fontSize: 15,
    minHeight: 100,
    color: '#A7CFF5',
  },
  text: {
    borderRadius: 8,
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    padding: 10,
    fontSize: 15,
    color: '#A7CFF5',
  },
});
