import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

const obtenerUsuarioActivo = () => ({
    nombre: 'Juan Pérez',
    correo: 'juan.perez@correo.com',
    telefono: '123-456-7890',
    direccion: 'Calle Ficticia, 123, Ciudad X',
    fechaNacimiento: '01/01/1990',
});

export default function PerfilScreen({ navigation }: any) {
    const [usuario, setUsuario] = useState<any>(null);

    useEffect(() => {
        const usuarioData = obtenerUsuarioActivo();
        setUsuario(usuarioData);
    }, []);

    const handleLogout = () => {
        Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas cerrar sesión?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Cerrar sesión', onPress: () => navigation.navigate('Welcome') },
        ]);
    };

    if (!usuario) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil del Usuario</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Información Personal</Text>
                <Text style={styles.infoText}>Nombre: {usuario.nombre}</Text>
                <Text style={styles.infoText}>Correo: {usuario.correo}</Text>
                <Text style={styles.infoText}>Teléfono: {usuario.telefono}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Dirección</Text>
                <Text style={styles.infoText}>{usuario.direccion}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Fecha de Nacimiento</Text>
                <Text style={styles.infoText}>{usuario.fechaNacimiento}</Text>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#212529',
    },
    section: {
        marginBottom: 25,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#007bff',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 8,
        color: '#495057',
    },
    logoutButton: {
        backgroundColor: '#284b63',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 30,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loadingText: {
        fontSize: 18,
        color: '#007bff',
        textAlign: 'center',
        marginTop: 20,
    },
});
