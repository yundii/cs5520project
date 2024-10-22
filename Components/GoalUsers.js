import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const GoalUsers = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          if (!response.ok) {
            throw new Error("An HTTP error hanppened with status: ${response.status}");
          }
          const users = await response.json();
          setUsers(users);
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
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.user}>{item.name}</Text>
          )}
        />
      </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    user: {
        fontSize: 18,
        marginBottom: 5,
    },
    }); 


export default GoalUsers;