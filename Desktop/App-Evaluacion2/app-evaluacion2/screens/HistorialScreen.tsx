import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity, Image } from 'react-native';

const TransactionItem = ({ item, onSelect }: any) => (
    <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
        <Text style={styles.itemType}>{item.tipoOperacion}</Text>
        <Text style={styles.itemText}>{item.descripcion}</Text>
        <Text>{`Cantidad: ${item.cantidad}`}</Text>
        <Text>{`Precio: ${item.precio}`}</Text> 
    </TouchableOpacity>
);

export default function HistorialScreen({ route }: any) {
    const { transactions } = route.params;
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelectItem = (item: any) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Transacciones</Text>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.idOperacion}
                renderItem={({ item }) => (
                    <TransactionItem item={item} onSelect={handleSelectItem} />
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {selectedItem?.tipoOperacion}
                        </Text>
                        <Image
                            source={require('../assets/img/pago-movil.png')}
                            style={styles.modalImage}
                        />
                        <Text>{`Cantidad: ${selectedItem?.cantidad}`}</Text>
                        <Text>{`Precio: $${selectedItem?.precio}`}</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        margin: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    item: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        elevation: 3,
    },
    itemType: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#355070',
        marginBottom: 5,
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'normal',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#355070',
    },
    modalImage: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#284b63',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
