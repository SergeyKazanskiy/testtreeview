import { useRouter } from 'expo-router';
import { FlatList, TouchableOpacity } from 'react-native';
import { UserCell } from '../../../../components/cells/UserCell';
import { ScreenContainer } from '../../../../components/containers/ScreenContainer';
import { useStore } from '../../store';


export function UsersView() {
	const { users,
		selectUser, checkUser } = useStore();

	const router = useRouter();

	const handleSelect = (user_id: number) => {
		selectUser(user_id);
		router.push('/users/ProfileScreen')
	}

	return (
		<ScreenContainer>
			<FlatList
				data={users}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) =>
					<TouchableOpacity onPress={() => handleSelect(item.id)}>
						<UserCell
							isCheck={false}
							first_name={item.first_name}
							last_name={item.last_name}
							photo={item.photo}
							onCheck={() => checkUser(item.id)}
						/>
					</TouchableOpacity>
				}
			/>
		</ScreenContainer>
	)
}