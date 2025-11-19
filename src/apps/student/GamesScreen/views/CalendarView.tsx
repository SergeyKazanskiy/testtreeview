import { DateStepper } from '@/src/components/calendar/DateStepper';
import { months } from '@/src/constants/constants';
import { getCurrentMonth, getCurrentYear } from '@/src/utils/utils';
import { StyleSheet, View } from 'react-native';
import { useStore } from '../../store';


export function CalendarView() {
    const { game_year, game_month } = useStore();
    const { selectGameDate } = useStore();

    function nextMonth() {
        if (game_month === 12) { selectGameDate(game_year + 1, 1)}
        else { selectGameDate(game_year, game_month + 1)}
    }

    function prevMonth() {
        if (game_month === 1) { selectGameDate(game_year - 1, 12)}
        else { selectGameDate(game_year, game_month - 1)}
    }

    return (
        <View style={styles.container}>
            <DateStepper title={String(game_year)}
                onPrev={() => selectGameDate(game_year - 1, 12)}
                onNext={() => selectGameDate(game_year + 1, 1)}
                canNext={getCurrentMonth() === 12 ? true : game_year < getCurrentYear()}
            />
            <DateStepper title={months[game_month-1]} 
                onPrev={prevMonth}
                onNext={nextMonth}
                canNext={getCurrentMonth() === 12 ? true : game_month <= getCurrentMonth()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 4
  },
});
