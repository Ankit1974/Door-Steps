import {StyleSheet} from "react-native"  //External Style


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
        paddingHorizontal: 13,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 15,
    },
    categoryContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginBottom: 10,
    },
    icon: {
        width: 70,
        height: 70,
        marginBottom: 10,
        borderRadius: 40,
        backgroundColor: "pink"
    },
    categoryText: {
        fontSize: 11,
        color: 'blue',
        textAlign: "center"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;