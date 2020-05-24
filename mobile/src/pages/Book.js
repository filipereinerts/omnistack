import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, SafeAreaView, TextInput, TouchableOpacity, AsyncStorage, Text, Alert } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {

    const id = navigation.getParam('id');
    const [date, setDate] = useState('');

    async function handleSubmit(){
        
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, { 
            date 
        }, {
            headers: { user_id }
        });

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');

    }

    function handleCancel(){

        navigation.navigate('List');

    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.form}>
                    <Text style={styles.label}>Data de interesse*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Qual data você quer reservar?"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        onChangeText={setDate}
                        value={date}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Solicitar reserva</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 20
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }

});