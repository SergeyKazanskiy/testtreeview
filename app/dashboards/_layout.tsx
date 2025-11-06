import { Stack } from "expo-router";


export default function DashboardsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#f8f8f8' },
        headerTintColor: '#000',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="employee/index" options={{ title: "Employee Dashboard" }}/>
      <Stack.Screen name="leader/index" options={{ title: "Leader Dashboard" }}/>
      <Stack.Screen name="manager/index" options={{ title: "Manager Dashboard" }}/>
    </Stack>
  );
}
