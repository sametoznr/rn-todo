import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const handleAddTask = () => {
    if (task.trim() === '') {
      Alert.alert('hata', 'lütfen görev giriniz');
      return;
    }

    setTasks([...tasks, { id: Date.now().toString(), text: task }]); // her göreve id verdik
    //... spread opt tüm elemanları topluyor
    setTask('');
  }

  const handDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.header}>
        <Text style={styles.headertxt}>Görev Listesi</Text>
      </View>

      <View style={styles.inputcont}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder='Yeni bir görev ekle'
          placeholderTextColor={'lightgrey'} />

        <TouchableOpacity
          style={styles.btn}
          onPress={handleAddTask}
        >
          <Text style={styles.btntxt}>Ekle</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listcontainer}>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskstxt}>{item.text}</Text>
              <TouchableOpacity style={styles.deletebtn} onPress={()=> handDeleteTask(item.id)}> 
                    <Text style={styles.deletxt}>Sil</Text>
              </TouchableOpacity>
               </View>
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.emptytxt}>Henüz görev eklenmedi</Text>} />
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff'
  },
  headertxt: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center'
  },
  inputcont: {
    flexDirection: 'row',    //elemanları yanyana diz
    padding: 15,
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  input: {
    borderWidth: 1,
    flex: 1,
    borderRadius: 6,
    paddingHorizontal: 15,
    fontSize: 15,
    marginRight: 10,
    borderColor: '#ddd',
    height: 45,
  },
  btn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    height: 45,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btntxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  listcontainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  emptytxt: {
    fontSize:18,
    fontWeight:'600',
  },
  taskstxt: {
    fontSize:18,
    fontWeight:'500'
  },
  deletebtn:{
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 10,
  },
   taskItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row', // Yazı ve butonu yan yana getirir
    justifyContent: 'space-between', // Aralarına boşluk koyarak birini sola, diğerini sağa yaslar
    alignItems: 'center', 
  },
  deletxt:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold'
  },

});
