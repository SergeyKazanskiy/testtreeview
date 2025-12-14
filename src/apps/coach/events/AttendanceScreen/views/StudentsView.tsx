import { StudentCell } from '@/src/components/cells/StudentCell';
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useStore } from '../../store';


export const StudentsView = () => { 
  const { students } = useStore();
    
  return (
    <FlatList
      data={students} 
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString() + item.first_name + item.last_name}
      renderItem={({ item }) =>

        <StudentCell
          first_name={item.first_name}
          last_name={item.last_name}
        />
    }/>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop: 60,
  },
  item: {
    marginVertical: 4
  },
  itemSelected: {
    marginVertical: 4,
    backgroundColor: "#555"
  },
});


/*
  const renderItem = ({ student }) => { // filter
    if (searchPhrase === "") {
      return <LiderCell name={item.name} details={item.details} />;
    }
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name} details={item.details} />;
    }
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <Item name={item.name} details={item.details} />;
    }
  };
*/