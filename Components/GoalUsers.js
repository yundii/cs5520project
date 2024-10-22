import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { writeToDB, getAllDocuments} from '../Firebase/firestoreHelper';

const GoalUsers = ({id}) => {
    const [data, setUsers] = useState([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        
        const dataFromDB = await getAllDocuments(`goals/${id}/users`);
        if (dataFromDB.length) {
            console.log("Data from DB", dataFromDB);
            setUsers(dataFromDB.map((user) => {return user.name;}));
        }
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          if (!response.ok) {
            throw new Error("An HTTP error hanppened with status: ${response.status}");
          }
          const data = await response.json();
          data.forEach ( (user) => writeToDB(user, `/goals/${id}/users`));
        setUsers(data.map((user) => {return user.name;}));
          
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Users List:</Text>
        <FlatList
            data={data}
            
            renderItem={({ item }) => (
                <Text style={styles.user}>{item}</Text>
            )}
        />

        </View>
    );
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    user: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default GoalUsers;