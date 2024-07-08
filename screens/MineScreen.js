import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MineScreen = () => {
  const [earn, setEarn] = useState(4999);
  const [level, setLevel] = useState(1);
  const [energy, setEnergy] = useState(1000);
  const progress = (earn / 5000) * 100;

  const [plusOnes, setPlusOnes] = useState([]);

  const handleTapCake = (event) => {
    const { locationX, locationY } = event.nativeEvent;

    const newPlusOne = {
      id: Date.now(),
      position: { x: locationX, y: locationY },
      animation: new Animated.Value(0),
    };

    setPlusOnes((prevPlusOnes) => [...prevPlusOnes, newPlusOne]);

    Animated.timing(newPlusOne.animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setPlusOnes((prevPlusOnes) =>
        prevPlusOnes.filter((plusOne) => plusOne.id !== newPlusOne.id)
      );
    });

    setEarn(earn + 1);
    setEnergy(energy - 1);
    if (earn >= 5000) {
      setEarn(0);
      setLevel(level + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}></View>
          <Text style={styles.username}>BaJoKa</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Exchange</Text>
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={['rgba(218, 0, 1, 0)', 'rgba(218, 0, 1, 0.6)', 'rgba(218, 0, 1, 0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.shadowGradient}
      />
      <View style={styles.background}></View>
      <LinearGradient
        colors={["#000000", "#391E18", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.main}
      >
        <View style={styles.mainHeader}>
          <View style={styles.frame}>
            <Text style={styles.redText}>Earn per tap</Text>
            <View style={styles.earn}>
              <Image
                source={require("../assets/gem.png")}
                style={styles.icon}
              />
              <Text style={styles.earnText}>+1</Text>
            </View>
          </View>
          <View style={styles.frame}>
            <Text style={styles.greenText}>Gems to level up</Text>
            <View style={styles.earn}>
              <Text style={styles.earnText}>5.000</Text>
            </View>
          </View>
          <View style={styles.frame}>
            <Text style={styles.greenText}>Profit per hour</Text>
            <View style={styles.earn}>
              <Image
                source={require("../assets/gem.png")}
                style={styles.icon}
              />
              <Text style={styles.earnText}>0</Text>
            </View>
          </View>
        </View>
        <View style={styles.mainEarn}>
          <Image source={require("../assets/gem.png")} style={styles.earnImg} />
          <Text style={styles.totalEarn}>{earn}</Text>
        </View>
        <View style={styles.brone}>
          <View style={styles.broneHeader}>
            <Text style={styles.broneHeaderText}>Bronze</Text>
            <Text style={styles.broneHeaderText}>Level {level}/9</Text>
          </View>
          <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, { width: `${progress}%` }]}
            ></View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.cake}
          onPress={(event) => handleTapCake(event)}
          activeOpacity={1}
        >
          <LinearGradient
            colors={["#FF5353", "#301B1B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.cakeCircle}
          ></LinearGradient>
          <LinearGradient
            colors={["#7E3939", "#4A1B1B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.cakeInner}
          ></LinearGradient>
          <Image
            source={require("../assets/cake.png")}
            style={styles.cakeImg}
          />
          <Image
            source={require("../assets/mask.png")}
            style={styles.maskImg}
          />
          {plusOnes.map((plusOne) => (
            <Animated.Text
              key={plusOne.id}
              style={[
                styles.plusOne,
                {
                  opacity: plusOne.animation,
                  transform: [
                    { translateX: plusOne.position.x - 120 },
                    { translateY: plusOne.position.y - 100 },
                    {
                      translateY: plusOne.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -100],
                      }),
                    },
                  ],
                },
              ]}
            >
              +1
            </Animated.Text>
          ))}
        </TouchableOpacity>
        <View style={styles.energy}>
          <View style={styles.energyHeader}>
            <Image
              source={require("../assets/fire.png")}
              style={styles.fireImg}
            />
            <Text style={styles.energyHeaderText}>{energy}/1000</Text>
          </View>
          <View style={styles.boost}>
            <Image
              source={require("../assets/boost.png")}
              style={styles.boostImg}
            />
            <Text style={styles.boostText}>Boost</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
    zIndex: 2,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    backgroundColor: "rgba(217, 217, 217, 0.3)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  shadowGradient: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    height: 160,
    zIndex: 2,
  },
  background: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#A94949",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    zIndex: 2,
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    backgroundColor: "transparent",
    overflow: "hidden",
    zIndex: 2,
  },
  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  frame: {
    alignItems: "center",
    justifyContent: "center",
    borderTopEndRadius: 14,
    borderTopStartRadius: 14,
    borderBottomEndRadius: 14,
    borderBottomStartRadius: 14,
    height: 54,
    width: 118,
    backgroundColor: "rgba(217, 217, 217, 0.1)",
  },
  redText: {
    color: "#D45D5D",
    fontSize: 12,
    lineHeight: 14.52,
  },
  earn: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 22.22,
    height: 20,
    marginRight: 5,
  },
  earnText: {
    fontSize: 16,
    color: "#fff",
  },
  greenText: {
    color: "#7CD45D",
    fontSize: 12,
    lineHeight: 14.52,
  },
  mainEarn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginTop: 20,
  },
  earnImg: {
    width: 64,
    height: 56,
  },
  totalEarn: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "bold",
  },
  broneHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  broneHeaderText: {
    color: "#DFDFDF",
    fontSize: 10,
  },
  progressContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#FEE001",
  },
  cake: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cakeCircle: {
    width: 298,
    height: 298,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  cakeInner: {
    position: "absolute",
    width: 270,
    height: 270,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  cakeImg: {
    position: "absolute",
    zIndex: 1,
  },
  maskImg: {
    position: "absolute",
  },
  energy: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  energyHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  energyHeaderText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  boost: {
    flexDirection: "row",
    alignItems: "center",
  },
  boostText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  plusOne: {
    position: "absolute",
    fontSize: 24,
    color: "#FFD700",
    fontWeight: "bold",
    zIndex: 2,
  },
});

export default MineScreen;
