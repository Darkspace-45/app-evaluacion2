import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { auth, db } from '../config/Config'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database'; 

export default function Register({ navigation }: { navigation: any }) {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [usuario, setUsuario] = useState('');
    const [celular, setCelular] = useState('');

    const handleRegister = async () => {
        if (!correo || !contraseña || !usuario || !celular) {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
            const userId = userCredential.user.uid;

            await set(ref(db, 'usuarios/' + userId), {
                correo,
                usuario,
                celular,
            });

            Alert.alert('Éxito', 'Registro exitoso.');
            setCorreo('');
            setContraseña('');
            setUsuario('');
            setCelular('');
            navigation.navigate('Login');
        } catch (error: any) {
            Alert.alert('Error', 'Campos incorrectos.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <Image source={require('../assets/img/perfil-del-usuario.png')} style={styles.image} />
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                placeholderTextColor="#aaa"
                value={usuario}
                onChangeText={setUsuario}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#aaa"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#aaa"
                value={contraseña}
                onChangeText={setContraseña}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Número de celular"
                placeholderTextColor="#aaa"
                value={celular}
                onChangeText={setCelular}
                keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    image: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 40,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#355070',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
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
});
