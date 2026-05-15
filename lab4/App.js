import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [currentPath, setCurrentPath] = useState(FileSystem.documentDirectory);
  const [items, setItems] = useState([]);
  const [storage, setStorage] = useState({ free: 0, total: 0, used: 0 });
  const [nameText, setNameText] = useState('');

  const [modal, setModal] = useState({ visible: false, type: '', item: null });
  const [fileContent, setFileContent] = useState('');

  useEffect(() => { refresh() }, [currentPath]);

  const refresh = async () => {
    try {
      const fileNames = await FileSystem.readDirectoryAsync(currentPath);
      const details = await Promise.all(
          fileNames.map(async (n) => {
            const info = await FileSystem.getInfoAsync(currentPath + n);
            return { name: n, uri: info.uri, isDir: info.isDirectory, size: info.size || 0, time: info.modificationTime };
          })
      );
      setItems(details);
      const free = await FileSystem.getFreeDiskStorageAsync();
      const total = await FileSystem.getTotalDiskCapacityAsync();
      setStorage({ free, total, used: total - free });
    } catch (e) { console.log(e); }
  };

  const create = async (isDir) => {
    if (!nameText.trim()) return Alert.alert("Помилка", "Введіть назву");
    const path = currentPath + nameText.trim() + (isDir ? '/' : '');
    try {
      isDir ? await FileSystem.makeDirectoryAsync(path) : await FileSystem.writeAsStringAsync(path, "Дані");
      setNameText(''); refresh();
    } catch (e) { Alert.alert("Помилка", "Не вдалося створити"); }
  };

  const onDelete = (item) => {
    Alert.alert("Видалити?", `Ви впевнені щодо ${item.name}?`, [
      { text: "Ні" },
      { text: "Так", onPress: async () => { await FileSystem.deleteAsync(item.uri); refresh(); } }
    ]);
  };

  const openFile = async (item) => {
    const text = await FileSystem.readAsStringAsync(item.uri);
    setFileContent(text);
    setModal({ visible: true, type: 'edit', item });
  };

  const saveFile = async () => {
    await FileSystem.writeAsStringAsync(modal.item.uri, fileContent);
    setModal({ visible: false, type: '', item: null }); refresh();
  };

  const goBack = () => {
    if (currentPath === FileSystem.documentDirectory) return;
    const path = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
    setCurrentPath(path.substring(0, path.lastIndexOf('/') + 1));
  };

  const toGB = (b) => (b / 1024 ** 3).toFixed(2);

  return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.boldText}>Пам'ять:</Text>
            <Text style={styles.smallText}>Усього: {toGB(storage.total)}GB | Зайнято: {toGB(storage.used)}GB | Вільно: {toGB(storage.free)}GB</Text>
            <Text style={styles.pathText}>Шлях: {currentPath.replace(FileSystem.documentDirectory, '/')}</Text>
          </View>

          <View style={styles.section}>
            <TextInput
                style={styles.input}
                placeholder="Назва..."
                placeholderTextColor="#888"
                value={nameText}
                onChangeText={setNameText}
            />
            <View style={styles.row}>
              <TouchableOpacity style={styles.simpleBtn} onPress={() => create(true)}><Text style={styles.text}>+ ПАПКА</Text></TouchableOpacity>
              <TouchableOpacity style={styles.simpleBtn} onPress={() => create(false)}><Text style={styles.text}>+ ФАЙЛ</Text></TouchableOpacity>
            </View>
          </View>

          <FlatList
              data={items}
              keyExtractor={(item) => item.uri}
              renderItem={({ item }) => (
                  <View style={styles.rowItem}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => item.isDir ? setCurrentPath(item.uri + '/') : openFile(item)}>
                      <Text style={styles.text}>{item.isDir ? "📁" : "📄"} {item.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModal({ visible: true, type: 'info', item })}><Text style={styles.infoIcon}>ℹ️</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => onDelete(item)}><Text style={styles.delIcon}>🗑️</Text></TouchableOpacity>
                  </View>
              )}
          />

          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={styles.text}>НАЗАД</Text>
          </TouchableOpacity>

          <Modal visible={modal.visible} animationType="none">
            <SafeAreaView style={[styles.container, {backgroundColor: '#1a1a1a'}]}>
              <View style={{ padding: 20, flex: 1 }}>
                {modal.type === 'edit' ? (
                    <>
                      <Text style={styles.text}>Файл: {modal.item?.name}</Text>
                      <TextInput multiline style={styles.editor} value={fileContent} onChangeText={setFileContent} />
                      <TouchableOpacity onPress={saveFile} style={styles.darkBtn}><Text style={styles.text}>ЗБЕРЕГТИ</Text></TouchableOpacity>
                    </>
                ) : (
                    <>
                      <Text style={styles.boldText}>Деталі:</Text>
                      <Text style={styles.text}>Назва: {modal.item?.name}</Text>
                      <Text style={styles.text}>Тип: {modal.item?.isDir ? 'Папка' : modal.item?.name.split('.').pop()}</Text>
                      <Text style={styles.text}>Розмір: {modal.item?.size} байт</Text>
                      <Text style={styles.text}>Дата: {new Date(modal.item?.time * 1000).toLocaleString()}</Text>
                    </>
                )}
                <TouchableOpacity onPress={() => setModal({ visible: false })} style={[styles.darkBtn, {marginTop: 10}]}><Text style={styles.text}>ЗАКРИТИ</Text></TouchableOpacity>
              </View>
            </SafeAreaView>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  section: { padding: 15, borderBottomWidth: 1, borderColor: '#333' },
  text: { color: '#eee' },
  boldText: { fontWeight: 'bold', fontSize: 16, color: '#fff' },
  smallText: { fontSize: 11, marginVertical: 2, color: '#bbb' },
  pathText: { fontSize: 10, color: '#666' },
  backBtn: { padding: 15, backgroundColor: '#222', alignItems: 'center', borderTopWidth: 1, borderColor: '#333' },
  darkBtn: { padding: 10, backgroundColor: '#333', alignItems: 'center' },
  simpleBtn: { padding: 10, borderWidth: 1, borderColor: '#444', flex: 0.45, alignItems: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  input: { borderBottomWidth: 1, borderColor: '#555', padding: 5, fontSize: 16, color: '#fff' },
  rowItem: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: '#222', alignItems: 'center' },
  infoIcon: { fontSize: 20, marginHorizontal: 15, color: '#aaa' },
  delIcon: { fontSize: 20, color: '#ff4444' },
  editor: { flex: 1, borderColor: '#444', borderWidth: 1, marginVertical: 15, padding: 10, textAlignVertical: 'top', color: '#fff' }
});