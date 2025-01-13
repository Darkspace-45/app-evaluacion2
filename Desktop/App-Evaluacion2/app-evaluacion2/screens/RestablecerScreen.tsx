import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RestablecerScreen({ navigation }: { navigation: any }) {
    const [correo, setCorreo] = useState('');

    const handleResetPassword = async () => {
        if (!correo) {
            Alert.alert('Error', 'Por favor, ingrese su correo electrónico.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, correo);
            Alert.alert('Éxito', 'Se ha enviado un correo para restablecer su contraseña.');
            setCorreo('');
            navigation.navigate('Login');
        } catch (error: any) {
            Alert.alert('Error', 'Hubo un error al restablecer la contraseña.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Restablecer Contraseña</Text>
            <Image source={require('../assets/img/bloqueo-de-rotacion.png')} style={styles.image} />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#aaa"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Enviar correo</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#355070',
    },
    image: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 40,
    },
    input: {
        borderWidth: 1,
        borderColor: '#355070',
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
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#355070',
        textDecorationLine: 'underline',
    },
});
