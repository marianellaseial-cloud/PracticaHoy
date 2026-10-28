import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native'
import { api } from '../services/api'

export default function ClientesScreen() {
  const [clientes, setClientes] = useState([])
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [clienteEditando, setClienteEditando] = useState(null)

  useEffect(() => { obtener() }, [])

  const obtener = async () => {
    try {
      const res = await api.get('/api/clientes')
      setClientes(res.data)
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los clientes')
    }
  }

  const editar = (cliente) => {
    setClienteEditando(cliente)
    setNombre(cliente.nombre)
    setEmail(cliente.email)
    setTelefono(cliente.telefono)
  }

  const actualizar = async () => {
    try {
      await api.put(`/api/clientes/${clienteEditando.id}`, { nombre, email, telefono })
      setNombre(''); setEmail(''); setTelefono(''); setClienteEditando(null)
      obtener()
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el cliente')
    }
  }

  const borrar = async (id) => {
    try {
      await api.delete(`/api/clientes/${id}`)
      obtener()
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el cliente')
    }
  }

  const guardar = () => {
    if (clienteEditando) { actualizar() } else { crear() }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>{clienteEditando ? 'Editar cliente' : 'Nuevo cliente'}</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
      <TouchableOpacity style={styles.btnGuardar} onPress={guardar}>
        <Text style={styles.btnText}>{clienteEditando ? 'Actualizar' : 'Agregar'}</Text>
      </TouchableOpacity>

      {clientes.length === 0 ? (
        clientes.map(c => (
          <View key={c.id} style={styles.item}>
            <Text style={styles.itemText}>{c.nombre} — {c.mail} — {c.telefono}</Text>
            <View style={styles.itemBtns}>
              <TouchableOpacity style={styles.btnEditar} onPress={() => editar(c)}>
                <Text style={styles.btnText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnBorrar} onPress={() => borrar(c.id)}>
                <Text style={styles.btnText}>Borrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.vacio}>No hay clientes cargados</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 18, fontWeight: 'bold', marginVertical: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 8 },
  btnGuardar: { backgroundColor: '#2563eb', padding: 12, borderRadius: 6, alignItems: 'center', marginBottom: 24 },
  btnEditar: { backgroundColor: '#f59e0b', padding: 8, borderRadius: 6, marginRight: 8 },
  btnBorrar: { backgroundColor: '#ef4444', padding: 8, borderRadius: 6 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#e5e7eb' },
  itemText: { flex: 1, fontSize: 15 },
  itemBtns: { flexDirection: 'row' },
  vacio: { textAlign: 'center', color: '#999', marginTop: 32, fontSize: 16 },
})
