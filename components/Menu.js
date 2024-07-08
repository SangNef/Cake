import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();
  const [activeMenu, setActiveMenu] = useState('Mine');
  const [dotPosition] = useState(new Animated.Value(0));

  useEffect(() => {
    const animateDot = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotPosition, { toValue: -2, duration: 400, useNativeDriver: true }),
          Animated.timing(dotPosition, { toValue: 0, duration: 400, useNativeDriver: true }),
        ])
      ).start();
    };

    animateDot();
  }, []);

  const handleMenuPress = (menuName) => {
    setActiveMenu(menuName);
    navigation.navigate(menuName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.menuItem, activeMenu === 'Mine' && styles.activeMenuItem]}
        onPress={() => handleMenuPress('Mine')}
      >
        <Image
          source={require('../assets/mine.png')}
          style={[styles.icon, activeMenu === 'Mine' && styles.activeIcon]}
        />
        <Text style={[styles.menuText, activeMenu === 'Mine' && styles.activeMenuText]}>Mine</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuItem, activeMenu === 'Friends' && styles.activeMenuItem]}
        onPress={() => handleMenuPress('Friends')}
      >
        <Image
          source={require('../assets/friends.png')}
          style={[styles.icon, activeMenu === 'Friends' && styles.activeIcon]}
        />
        <Text style={[styles.menuText, activeMenu === 'Friends' && styles.activeMenuText]}>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuItem, activeMenu === 'Earn' && styles.activeMenuItem]}
        onPress={() => handleMenuPress('Earn')}
      >
        <Image
          source={require('../assets/earn.png')}
          style={[styles.icon, activeMenu === 'Earn' && styles.activeIcon]}
        />
        <Animated.View style={[styles.dot, { transform: [{ translateY: dotPosition }] }]} />
        <Text style={[styles.menuText, activeMenu === 'Earn' && styles.activeMenuText]}>Earn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuItem, activeMenu === 'Upgrade' && styles.activeMenuItem]}
        onPress={() => handleMenuPress('Upgrade')}
      >
        <Image
          source={require('../assets/upgrade.png')}
          style={[styles.icon, activeMenu === 'Upgrade' && styles.activeIcon]}
        />
        <Text style={[styles.menuText, activeMenu === 'Upgrade' && styles.activeMenuText]}>Upgrade</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuItem, activeMenu === 'Airdrop' && styles.activeMenuItem]}
        onPress={() => handleMenuPress('Airdrop')}
      >
        <Image
          source={require('../assets/airdrop.png')}
          style={[styles.icon, activeMenu === 'Airdrop' && styles.activeIcon]}
        />
        <Text style={[styles.menuText, activeMenu === 'Airdrop' && styles.activeMenuText]}>Airdrop</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 22 : 0,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    position: 'relative',
  },
  icon: {
    tintColor: '#606060',
  },
  activeIcon: {
    tintColor: '#FFFF22',
  },
  menuText: {
    fontSize: 12,
    color: '#606060',
  },
  activeMenuText: {
    color: '#FFFF22',
    fontWeight: 'bold',
  },
  activeMenuItem: {
    backgroundColor: "rgba(217, 217, 217, 0.1)",
    borderRadius: 16,
    height: 46,
  },
  dot: {
    position: 'absolute',
    backgroundColor: '#FF0000', // Red color
    width: 4,
    height: 4,
    borderRadius: 4,
    top: 8,
    right: 21,
    zIndex: 1,
  },
});

export default Menu;
