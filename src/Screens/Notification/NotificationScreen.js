import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, MenuItem, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NotificationContext } from './NotificationContext';
const NotificationScreen = () => {
    const { notifications, removeNotification } = useContext(NotificationContext);
    const [visible, setVisible] = useState({});

    const openMenu = (index) => {
        setVisible((prev) => ({ ...prev, [index]: true }));
    };

    const closeMenu = (index) => {
        setVisible((prev) => ({ ...prev, [index]: false }));
    };

    const handleDelete = (index) => {
        removeNotification(index);
        closeMenu(index);
    };

    const renderNotification = ({ item, index }) => (
        <View style={styles.notification}>
            <Text style={styles.notificationText}>{item}</Text>
            <Menu
                visible={visible[index]}
                onDismiss={() => closeMenu(index)}
                anchor={
                    <TouchableOpacity onPress={() => openMenu(index)}>
                        <Icon name="more-vert" size={24} color="#000" />
                    </TouchableOpacity>
                }
            >
                <MenuItem onPress={() => handleDelete(index)}>Delete</MenuItem>
            </Menu>
        </View>
    );

    return (
        <Provider>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Notifications ({notifications.length})</Text>
                </View>
                <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={(index) => index.toString()}
                />
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    notification: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    notificationText: {
        fontSize: 16,
        color: '#000',
    },
});

export default NotificationScreen;
