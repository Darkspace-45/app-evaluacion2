import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';

export default function OperacionesScreen({ navigation }: any) {
    const [idOperacion, setIdOperacion] = useState('');
    const [tipoOperacion, setTipoOperacion] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState(''); // Nuevo estado para el precio
    const [registro, setRegistro] = useState<{ idOperacion: string; tipoOperacion: string; cantidad: number; precio: number; }[]>([]);

    const handleGuardar = () => {
        const cantidadNumero = parseInt(cantidad);
        const precioNumero = parseFloat(precio); // Convertir el precio a número

        if (!idOperacion || !tipoOperacion || isNaN(cantidadNumero) || isNaN(precioNumero)) {
            Alert.alert('Error', 'Por favor complete todos los campos.');
            return;
        }

        if (cantidadNumero < 1) {
            Alert.alert('Error', 'La cantidad no puede ser negativa.');
            return;
        }

        if (precioNumero <= 0) {
            Alert.alert('Error', 'El precio debe ser un número positivo.');
            return;
        }

        if (cantidadNumero < 1 || cantidadNumero > 20 || precioNumero < 1 || precioNumero > 20) {
            Alert.alert(
                'Confirmar Operación',
                'El monto está fuera de los valores recomendados (entre $1 y $20). ¿Desea continuar?',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Continuar', onPress: () => realizarOperacion(cantidadNumero, precioNumero) }
                ]
            );
        } else {
            realizarOperacion(cantidadNumero, precioNumero);
        }
    };

    const realizarOperacion = (cantidadNumero: number, precioNumero: number) => {
        const nuevoRegistro = { idOperacion, tipoOperacion, cantidad: cantidadNumero, precio: precioNumero };
        setRegistro([...registro, nuevoRegistro]);
        Alert.alert('Éxito', 'Operación realizada con éxito.');
        setIdOperacion('');
        setTipoOperacion('');
        setCantidad('');
        setPrecio('');
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
            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={precio}
                onChangeText={setPrecio}
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
