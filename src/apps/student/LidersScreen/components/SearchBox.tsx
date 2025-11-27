import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";


type Props = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
};

export const SearchBox: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder ?? "Search"}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChange}
      />
      <Ionicons name="search" size={20} color="#777" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 16,
    paddingLeft: 8,
  },
  input: {
    flex: 1,
    height: 36,
    fontSize: 15,
    width: 130
  },
  icon: {
    marginRight: 4,
  },
});
