import { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [goals, setGoals] = useState([]);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const addGoalHandler = (enteredGoalText) => {
    if (enteredGoalText.trim().length > 0)
      setGoals((currentGoals) => {
        const length = currentGoals.length;
        return [...currentGoals, { id: length, text: enteredGoalText }];
      });
  };

  const deleteGoalHandler = (id) => {
    setGoals((currentGoals) => currentGoals.filter(goal => goal.id !== id));
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title='Add New Goal' color="#5e0acc" onPress={showModalHandler} />
        <GoalInput showModal={showModal} hideModal={hideModal} onAddGoal={addGoalHandler} />
        <View style={styles.goalsContainer}>
          <FlatList data={goals}
            keyExtractor={(item, index) => item.id}
            renderItem={(itemData) => (
              <GoalItem id={itemData.item.id} text={itemData.item.text} onDeleteItem={deleteGoalHandler} />
            )} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
  goalsContainer: {
    flex: 5,
    marginTop: 8
  }
});
