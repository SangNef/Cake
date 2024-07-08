import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import vector icons
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const EarnScreen = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Easy Cake daily news 1",
      completed: false,
      loading: false,
    },
    {
      id: 2,
      title: "Easy Cake daily news 2",
      completed: false,
      loading: false,
    },
    {
      id: 3,
      title: "Easy Cake daily news 3",
      completed: false,
      loading: false,
    },
  ]);

  const [checkinTasks, setCheckinTasks] = useState([
    { id: 4, title: "Daily checkin 1", completed: false, loading: false },
    { id: 5, title: "Daily checkin 2", completed: false, loading: false },
    { id: 6, title: "Daily checkin 3", completed: false, loading: false },
  ]);

  const handlePress = (taskId, setTaskFunction) => {
    setTaskFunction((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, loading: true } : task
      )
    );

    setTimeout(() => {
      setTaskFunction((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, loading: false, completed: true }
            : task
        )
      );
    }, 1000);
  };

  const handleTaskPress = (task, setTaskFunction) => {
    if (!task.completed && !task.loading) {
      handlePress(task.id, setTaskFunction);
    }
  };

  const color1 = useRef(new Animated.Value(0)).current;
  const color2 = useRef(new Animated.Value(0)).current;
  const color3 = useRef(new Animated.Value(0)).current;
  const color4 = useRef(new Animated.Value(0)).current;

  const translateY1 = useRef(new Animated.Value(100)).current;
  const translateY2 = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(translateY1, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY2, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      delay: 200, // Độ trễ cho view content thứ hai
    }).start();
  }, []);

  useEffect(() => {
    const animateColors = () => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(color1, {
              toValue: 1,
              duration: 4000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(color1, {
              toValue: 0,
              duration: 4000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          ]),
          Animated.sequence([
            Animated.timing(color2, {
              toValue: 1,
              duration: 4000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(color2, {
              toValue: 0,
              duration: 4000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          ]),
          Animated.sequence([
            Animated.timing(color3, {
              toValue: 1,
              duration: 4000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(color3, {
              toValue: 0,
              duration: 4000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          ]),
          Animated.sequence([
            Animated.timing(color4, {
              toValue: 1,
              duration: 4000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(color4, {
              toValue: 0,
              duration: 4000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          ]),
        ])
      ).start();
    };

    animateColors();
  }, []);

  const interpolateColor = (animatedValue, color1, color2) => {
    return animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [color1, color2],
    });
  };

  return (
    <LinearGradient
      colors={["#000000", "#272007", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.outerBox}>
            <Animated.View
              style={[
                styles.animatedBox,
                styles.box1,
                {
                  backgroundColor: interpolateColor(
                    color1,
                    "#2A2A14",
                    "#48483C"
                  ),
                },
              ]}
            />
            <Animated.View
              style={[
                styles.animatedBox,
                styles.box2,
                {
                  backgroundColor: interpolateColor(
                    color2,
                    "#212113",
                    "#3A3A2F"
                  ),
                },
              ]}
            />
            <Animated.View
              style={[
                styles.animatedBox,
                styles.box3,
                {
                  backgroundColor: interpolateColor(
                    color3,
                    "#1C1C12",
                    "#35352A"
                  ),
                },
              ]}
            />
            <Animated.View
              style={[
                styles.animatedBox,
                styles.box4,
                {
                  backgroundColor: interpolateColor(
                    color4,
                    "#1A1911",
                    "#31312A"
                  ),
                },
              ]}
            />
            <Image
              source={require("../assets/bigGem.png")}
              style={styles.mainGem}
            />
          </View>
          <Text style={styles.mainText}>GET MORE GEM</Text>
        </View>
        <Animated.View
          style={[styles.content, { transform: [{ translateY: translateY1 }] }]}
        >
          <Text style={styles.sectionTitle}>Youtube</Text>
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.youtubeSection}
              onPress={() => handleTaskPress(task, setTasks)}
            >
              <Image
                source={require("../assets/youtube.png")}
                style={styles.youtubeIcon}
              />
              <View style={styles.reward}>
                <Text style={styles.subscribeText}>{task.title}</Text>
                <View style={styles.rewardContainer}>
                  <Image
                    source={require("../assets/gem.png")}
                    style={styles.gemIcon}
                  />
                  <Text style={styles.rewardText}>+5000</Text>
                </View>
              </View>
              {task.loading ? (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  style={styles.loadingIndicator}
                />
              ) : task.completed ? (
                <Icon
                  name="checkmark-circle"
                  size={24}
                  color="#fff"
                  style={styles.icon}
                />
              ) : (
                <Image
                  source={require("../assets/arrow.png")}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
          ))}
        </Animated.View>
        <Animated.View
          style={[styles.content, { transform: [{ translateY: translateY2 }] }]}
        >
          <Text style={styles.sectionTitle}>Daily checkin</Text>
          {checkinTasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.youtubeSection}
              onPress={() => handleTaskPress(task, setCheckinTasks)}
            >
              <Image
                source={require("../assets/task.png")}
                style={styles.youtubeIcon}
              />
              <View style={styles.reward}>
                <Text style={styles.subscribeText}>{task.title}</Text>
                <View style={styles.rewardContainer}>
                  <Image
                    source={require("../assets/gem.png")}
                    style={styles.gemIcon}
                  />
                  <Text style={styles.rewardText}>+5000</Text>
                </View>
              </View>
              {task.loading ? (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  style={styles.loadingIndicator}
                />
              ) : task.completed ? (
                <Icon
                  name="checkmark-circle"
                  size={24}
                  color="#fff"
                  style={styles.icon}
                />
              ) : (
                <Image
                  source={require("../assets/arrow.png")}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  outerBox: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  animatedBox: {
    position: "absolute",
    borderRadius: 999,
  },
  box1: {
    width: 428,
    height: 428,
  },
  box2: {
    width: 356,
    height: 356,
  },
  box3: {
    width: 270,
    height: 270,
  },
  box4: {
    width: 156,
    height: 156,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginBottom: 10,
  },
  mainGem: {
    width: 114,
    height: 100,
    position: "absolute",
  },
  mainText: {
    color: "#fff",
    fontSize: 24,
    marginTop: 80,
    fontWeight: "bold",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    marginTop: 18,
  },
  youtubeSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "rgba(57, 57, 40, 0.9)",
    padding: 16,
    borderRadius: 18,
  },
  youtubeIcon: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  subscribeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  reward: {
    flex: 1,
  },
  rewardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  rewardText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  gemIcon: {
    width: 22,
    height: 20,
  },
  icon: {
    marginLeft: "auto",
  },
  loadingIndicator: {
    marginLeft: "auto",
  },
});

export default EarnScreen;
