import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';

export default function OperacionesScreen({ navigation }: any) {
    const [idOperacion, setIdOperacion] = useState('');
    const [tipoOperacion, setTipoOperacion] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [registro, setRegistro] = useState<{ idOperacion: string; tipoOperacion: string; cantidad: number; }[]>([]);

    const handleGuardar = () => {
        const cantidadNumero = parseInt(cantidad);

        if (!idOperacion || !tipoOperacion || isNaN(cantidadNumero)) {
            Alert.alert('Error', 'Por favor complete todos los campos.');
            return;
        }

        if (cantidadNumero < 0) {
            Alert.alert('Error', 'La cantidad no puede ser negativa.');
            return;
        }

        const nuevoRegistro = { idOperacion, tipoOperacion, cantidad: cantidadNumero };
        setRegistro([...registro, nuevoRegistro]);
        Alert.alert('Éxito', 'Operación realizada con éxito.');
        setIdOperacion('');
        setTipoOperacion('');
        setCantidad('');
        navigation.navigate('Historial', { transactions: [...registro, nuevoRegistro] });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Operaciones</Text>
            <Image source={require('../assets/img/pago-cajero.png')} style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder="ID Operación"
                value={idOperacion}
                onChangeText={setIdOperacion}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo de Operación"
                value={tipoOperacion}
                onChangeText={setTipoOperacion}
            />
            <TextInput
                style={styles.input}
                placeholder="Cantidad"
                value={cantidad}
                onChangeText={setCantidad}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleGuardar}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 30,
    },
    input: {
        width: '100%',
        borderColor: '#355070',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#355070',
        padding: 15,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
