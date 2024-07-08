import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const Header = ({ navigation }) => (
  <View style={styles.headerComponent}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.closeApp()}>
        <Ionicons name="close" size={24} color="#727272" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Cake Cake Cake</Text>
      <View></View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerComponent: {
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 22,
    borderBottomWidth: 1,
    marginTop: 44,
  },
  headerTitle: {
    color: '#727272',
    fontSize: 18,
  },
});

export default Header;
