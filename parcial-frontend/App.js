import React, { useState } from 'react'
import LoginScreen from './screens/LoginScreen'
import ClientesScreen from './screens/ClientesScreen'

export default function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(false)

  if (!usuarioLogueado) {
    return <LoginScreen onLogin={() => setUsuarioLogueado(true)} />
  }

  return <ClientesScreen />
}
