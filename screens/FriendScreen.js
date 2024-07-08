import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const FriendScreen = () => {
  const [friends, setFriends] = useState([]);
  const tiltAnimation = useRef(new Animated.Value(0)).current;
  const slideUpAnimation = useRef(new Animated.Value(0)).current;
  const noFriendOpacityAnimation = useRef(new Animated.Value(1)).current; // Thêm Animated.Value cho opacity của noFriend
  const translateY1 = useRef(new Animated.Value(100)).current;
  const translateX1 = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(translateY1, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateX1, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const startTilt = () => {
    Animated.sequence([
      Animated.timing(tiltAnimation, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(tiltAnimation, {
        toValue: -1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(tiltAnimation, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(tiltAnimation, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleReload = () => {
    startTilt();

    setTimeout(() => {
      setFriends([
        { name: "Anglabell", reward: "+5.000" },
        { name: "John Doe", reward: "+5.000" },
        { name: "Jane Smith", reward: "+5.000" },
      ]);
      Animated.timing(noFriendOpacityAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(slideUpAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1000);
  };

  const tiltInterpolation = tiltAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-15deg", "15deg"],
  });

  const slideUpInterpolation = slideUpAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -98],
  });

  const noFriendOpacity = noFriendOpacityAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <LinearGradient
      colors={["#000", "#11192F", "#000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <ScrollView style={styles.friendList}>
        <Animated.View style={[styles.headerContainer, {transform: [{translateX: translateX1}]}]}>
        <View style={styles.friendHeader}>
          <Text style={styles.inviteTitle}>Invite Friends!</Text>
          <Text style={styles.inviteContent}>
            You and your friends will both receive rewards.
          </Text>
        </View>
        <View style={styles.friendQuests}>
          <View style={styles.quests}>
            <Text style={styles.questTitle}>Invite friends</Text>
            <View style={styles.rewardArea}>
              <Image
                source={require("../assets/gem.png")}
                style={styles.rewardImg}
              />
              <Text style={styles.reward}>+5.000</Text>
              <Text style={styles.rewardContent}>for you and your friend</Text>
            </View>
          </View>
          <View style={styles.quests}>
            <Text style={styles.questTitle}>Invite friends</Text>
            <View style={styles.rewardArea}>
              <Image
                source={require("../assets/gem.png")}
                style={styles.rewardImg}
              />
              <Text style={styles.reward}>+5.000</Text>
              <Text style={styles.rewardContent}>for you and your friend</Text>
            </View>
          </View>
          <Text style={styles.moreText}>Get more rewards</Text>
        </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.friendListContainer,
            { transform: [{ translateY: translateY1 }] },
          ]}
        >
          <View style={styles.friendListHeader}>
            <Text style={styles.headerText}>
              Friend List ({friends.length})
            </Text>
            <TouchableOpacity onPress={handleReload}>
              <Animated.Image
                source={require("../assets/reload.png")}
                style={[
                  styles.reloadImg,
                  { transform: [{ rotate: tiltInterpolation }] },
                ]}
              />
            </TouchableOpacity>
          </View>
          <Animated.View style={{ opacity: noFriendOpacity }}>
            <View style={styles.noFriend}>
              <Text style={styles.noFriendsText}>
                You haven't invited anyone yet
              </Text>
            </View>
          </Animated.View>
          <Animated.View
            style={{
              opacity: 1,
              transform: [{ translateY: slideUpInterpolation }],
            }}
          >
            <View style={styles.friendCard}>
              {friends.map((friend, index) => (
                <React.Fragment key={index}>
                  <View style={styles.friendItem}>
                    <View style={styles.friendContent}>
                      <View style={styles.avatar}></View>
                      <Text style={styles.friendName}>{friend.name}</Text>
                    </View>
                    <View style={styles.rewarDetail}>
                      <Image
                        source={require("../assets/gem.png")}
                        style={styles.rewardItem}
                      />
                      <Text style={styles.friendReward}>{friend.reward}</Text>
                    </View>
                  </View>
                  {index !== friends.length - 1 && (
                    <View style={styles.friendUnderline}></View>
                  )}
                </React.Fragment>
              ))}
            </View>
            {friends.length > 0 && (
              <View style={styles.newInviteContainer}>
                <TouchableOpacity style={styles.inviteBtn}>
                  <Text style={styles.inviteText}>Invite friends</Text>
                  <Image source={require("../assets/invite.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.copyBtn}>
                  <Image source={require("../assets/copy.png")} />
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </Animated.View>
      </ScrollView>
      {friends.length === 0 && (
        <View style={styles.inviteContainer}>
          <TouchableOpacity style={styles.inviteBtn}>
            <Text style={styles.inviteText}>Invite friends</Text>
            <Image source={require("../assets/invite.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.copyBtn}>
            <Image source={require("../assets/copy.png")} />
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  friendHeader: {
    marginTop: 24,
    alignItems: "center",
  },
  inviteTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    lineHeight: 29,
  },
  inviteContent: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 17,
    marginTop: 8,
    marginBottom: 28,
  },
  friendQuests: {
    width: "100%",
  },
  quests: {
    backgroundColor: "rgba(217, 217, 217, 0.1)",
    borderRadius: 18,
    padding: 16,
    marginVertical: 8,
  },
  questTitle: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 17,
    marginBottom: 8,
  },
  rewardArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  rewardImg: {
    width: 22,
    height: 20,
  },
  reward: {
    color: "#fff",
    marginLeft: 8,
  },
  rewardContent: {
    color: "#fff",
    marginLeft: 4,
  },
  moreText: {
    color: "#36C3FF",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  friendList: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  friendListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 19,
  },
  reloadImg: {
    width: 24,
    height: 24,
  },
  noFriend: {
    paddingVertical: 33,
    backgroundColor: "rgba(217, 217, 217, 0.1)",
    borderRadius: 18,
    marginTop: 12,
  },
  noFriendsText: {
    color: "#616161",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  friendContainer: {
    alignItems: "center",
  },
  friendCard: {
    marginTop: 12,
    paddingHorizontal: 24,
    backgroundColor: "rgba(217, 217, 217, 0.1)",
    borderRadius: 18,
    alignItems: "center",
    width: "100%",
  },
  friendItem: {
    width: "100%",
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  friendContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
  },
  friendName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  rewarDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  rewardItem: {
    width: 22,
    height: 20,
  },
  friendListContainer: {
    flex: 1,
    marginBottom: 80,
  },
  friendReward: {
    color: "#FFFF22",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 20,
    marginTop: 4,
  },
  friendUnderline: {
    width: "100%",
    height: 1,
    backgroundColor: "#484848",
  },
  inviteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 6,
  },
  newInviteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    gap: 6,
  },
  inviteBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#36C3FF",
    borderRadius: 18,
    height: 54,
    justifyContent: "center",
  },
  inviteText: {
    fontSize: 14,
    marginRight: 4,
  },
  copyBtn: {
    backgroundColor: "#36C3FF",
    padding: 12,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    width: 54,
    height: 54,
  },
});

export default FriendScreen;
