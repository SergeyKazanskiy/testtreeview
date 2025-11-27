import { BACKEND_APP_IMAGES_URL, examColors, RuleTests } from '@/src/constants/constants';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AvatarWrapper } from '../../../../components/avatars/AvatarWrapper';
import { ExamBanner } from '../../../../components/bars/ExamBanner';
import { ScoreBanner } from '../../../../components/bars/ScoreBanner';
import { TeamPanel } from '../../../../components/bars/TeamPanel';
import { TestFields } from '../../model';
import { useStore } from '../../store';


export const HeaderView = () => { 
  const { student, last_test, level, percent, levelColor, group_name, average } = useStore();
  const { selectTest } = useStore();

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <View style={{zIndex: 100}}>
          <AvatarWrapper
            avatar={{uri: `${BACKEND_APP_IMAGES_URL}/avatars/${student.avatar}.png`}}
            level={level}
            percent={percent}
            levelColor={levelColor}
          />
        </View>
        <View style={{marginTop: -20, marginBottom: 10}}>
          <ScoreBanner average={average}/>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{student.first_name + ' ' + student.last_name}</Text>
        <TeamPanel w={152} teamName={group_name} fontS={14}/>

        <View style={styles.row}>
          {[last_test.speed, last_test.stamina, last_test.climbing, last_test.evasion, last_test.hiding].map((item, inx) => (
            <TouchableOpacity key={item} onPress={() => selectTest(TestFields[inx])}>
               <ExamBanner value={item?? 0} color={examColors[inx]} icon={RuleTests[inx]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: "row",
    backgroundColor: "#000",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  avatar: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  info: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
    paddingRight: 8
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    paddingVertical: 10
  },
  row: {
    flexDirection: "row",
    marginTop: 12,
    gap: 6,
  },
});
