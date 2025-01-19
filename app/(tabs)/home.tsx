import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import SVGComponent from '../../components/circularProgress';
import { useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(FIREBASE_DB, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello</Text>
          <Text style={styles.username}>{userData.name}</Text>
        </View>
        <View style={styles.headerRight}>
          <FontAwesome name="bell-o" size={20} color="#000" />
          <TouchableOpacity onPress={() => router.push('../profile')}>
            <Image 
              source={{ uri: userData.picture }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsLeft}>
          <SVGComponent height={120} width={120}/>
          <View style={styles.statsTextContainer}>
            <Text style={styles.statsText}>+2 hrs ago</Text>
            <Text style={styles.statsSubText}>last smoked</Text>
          </View>
        </View>
        <View style={styles.statsRight}>
          <View style={styles.noCigarettesContainer}>
            <Image 
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/15/15146.png" }}
              style={styles.noCigarettesImage}
            />
            <Text style={styles.noCigarettesText}>No cigarettes</Text>
          </View>
          <Text style={styles.streakText}>
            <Text style={styles.streakCount}>4</Text>/10 days
          </Text>
          <TouchableOpacity style={styles.checkInButton} onPress={() => router.push('/qs1')}>
            <Text style={styles.checkInButtonText}>Check-in</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Saved</Text>
            <Image 
              source={require('../../assets/images/arrow.png')} 
              style={styles.cardArrow}
            />
          </View>
          <Text style={styles.cardText}>With this money you could buy a gym membership for a month</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardAmount}>₹300</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Weekly Average</Text>
            <Image 
              source={require('../../assets/images/arrow.png')} 
              style={styles.cardArrow}
            />
          </View>
          <View style={styles.cardStats}>
            <Text style={styles.cardStatsValue}>2.5</Text>
            <Text style={styles.cardStatsText}>Daily Average Smokes</Text>
          </View>
          <Text style={styles.cardStatsChange}>↓ 12% vs last week</Text>
        </View>
      </View>
      <View style={styles.activityLog}>
        <View style={styles.activityLogHeader}>
          <Text style={styles.activityLogTitle}>Activity Log</Text>
          <Image 
            source={require('../../assets/images/arrow.png')} 
            style={styles.activityLogArrow}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFEEDB',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  statsLeft: {
    flex: 1,
    alignItems: 'center',
  },
  statsTextContainer: {
    position: 'absolute',
    bottom: '25%',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsSubText: {
    fontSize: 14,
  },
  statsRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noCigarettesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noCigarettesImage: {
    width: 28,
    height: 28,
  },
  noCigarettesText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  streakText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  streakCount: {
    color: '#FF0000',
  },
  checkInButton: {
    backgroundColor: '#FF6347',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFEEDB',
    borderRadius: 16,
    padding: 16,
    marginRight: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardArrow: {
    width: 24,
    height: 24,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  cardFooter: {
    alignItems: 'flex-end',
    marginTop: 16,
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  cardStatsValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardStatsText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  cardStatsChange: {
    fontSize: 14,
    color: '#00FF00',
    marginTop: 8,
  },
  activityLog: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  activityLogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityLogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  activityLogArrow: {
    width: 24,
    height: 24,
  },
});

export default Home;