import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../config/Config';

export default function Login({ navigation }: { navigation: any }) {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');

    const handleLogin = async () => {
        if (!correo || !contraseña) {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, correo, contraseña);
            Alert.alert('Éxito', 'Inicio de sesión exitoso.');
            setCorreo('');
            setContraseña('');
            navigation.navigate('Operaciones');
        } catch (error: any) {
            Alert.alert('Error', 'Su correo o contraseña son incorrectos.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>INICIAR SESIÓN</Text>
            <Image source={require('../assets/img/bloqueo-alternativo.png')} style={styles.image} />
            <TextInput
                style={styles.input}
                placeholder="Ingrese correo"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Ingrese contraseña"
                value={contraseña}
                onChangeText={setContraseña}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Restablecer')}>
                <Text style={styles.resetPassword}>¿Olvidaste tu contraseña?</Text>
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 50,
    },
    input: {
        width: '80%',
        borderColor: '#6b705c',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#6b705c',
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
    resetPassword: {
        marginTop: 15,
        color: '#6b705c',
        textDecorationLine: 'underline',
    },
});
