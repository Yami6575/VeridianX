import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
} from 'react-native';
import styles from '../../styles2';
import roomsData from '../../discoverData.json';
import postsData from '../../postsData.json';
import ParticipantAvatars from "../../components/ParticipantAvatars";
import RoomDetailsScreen from '../../RoomDetailsScreen'; // Import the modal component
import Icon from 'react-native-vector-icons/MaterialIcons';
import {router, useNavigation} from "expo-router";

const DiscoverScreen = () => {
    const navigation = useNavigation();

    const popularRooms = roomsData.filter((room) => room.type === 'room');

    const [isDetailsPopupVisible, setDetailsPopupVisible] = useState(false); // State for Modal Visibility
    const [selectedRoom, setSelectedRoom] = useState(null); // State for Selected Room

    // Function to open the Room Details Modal
    const openRoomDetailsPopup = (room) => {
        setSelectedRoom(room);
        setDetailsPopupVisible(true);
    };

    // Function to close the Room Details Modal
    const closeRoomDetailsPopup = () => {
        setSelectedRoom(null);
        setDetailsPopupVisible(false);
    };

    const renderPostItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    console.log('Navigating to PostDetails with:', item);
                    console.log('Current Route:', router.asPath);
                    router.push({
                        pathname: '/PostDetails', // Navigate to PostDetails route
                        params: { post: item },  // Pass the selected post data as params
                    });
                }}>                <View style={{ ...styles.card, marginVertical: 5 }}>
                    {item.imageUrl && (
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={{ height: 150, width: '100%', borderRadius: 10 }}
                        />
                    )}

                    <Text style={styles.posttitle}>{item.title}</Text>

                    <View style={styles.authorAndIconContainer}>
                        <View style={styles.authorContainer}>
                            <Image
                                source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                                style={styles.authorAvatar}
                            />
                            <Text style={styles.authorName}>{item.author}</Text>
                        </View>

                        <View style={styles.iconContainer}>
                            <View style={styles.iconWithCount}>
                                <TouchableOpacity>
                                    <Icon name="star" size={20} color="#FFD700" />
                                </TouchableOpacity>
                                <Text style={styles.iconCount}>{item.upvotes}</Text>
                            </View>
                            <View style={styles.iconWithCount}>
                                <TouchableOpacity style={{ marginLeft: 15 }}>
                                    <Icon name="comment" size={20} color="gray" />
                                </TouchableOpacity>
                                {/* Fix: Display number of comments here */}
                                <Text style={styles.iconCount}>{item.comments ? item.comments.length : 0}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };    const participants = [
        'https://randomuser.me/api/portraits/men/1.jpg',
        'https://randomuser.me/api/portraits/men/2.jpg',
        'https://randomuser.me/api/portraits/men/3.jpg',
    ];

    const renderPopularRoomItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.roomCard}
                onPress={() => openRoomDetailsPopup(item)} // Trigger the modal for selected room
            >
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subTitle}>hosted by {item.host}</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <ParticipantAvatars participants={participants} />
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text
                            style={{
                                marginLeft: 5,
                                fontFamily: 'Inter',
                                fontWeight: 350,
                                fontSize: 10,
                            }}
                        >
                            👥{item.listenerCount}+
                        </Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Join Room</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Discover')}>
                    <Text style={[styles.headerText, styles.headerSelect]}>Discover</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('RoomsStack')}>
                    <Text style={styles.headerText}>Rooms</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.headerText}>Top Charts</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 15 }}>
                <Text
                    style={{
                        ...styles.title,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                >
                    Popular Rooms
                </Text>
                <FlatList
                    horizontal
                    data={popularRooms}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderPopularRoomItem}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <FlatList
                data={postsData}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderPostItem}
                style={{ marginHorizontal: 15 }}
            />

            {/* Modal for Room Details */}
            {isDetailsPopupVisible && selectedRoom && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isDetailsPopupVisible}
                    onRequestClose={closeRoomDetailsPopup}
                >
                    <RoomDetailsScreen
                        room={selectedRoom}
                        onClose={closeRoomDetailsPopup}
                    />
                </Modal>
            )}
        </View>
    );
};

export default DiscoverScreen;