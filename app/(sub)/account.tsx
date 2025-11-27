import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Usando AntDesign do expo/vector-icons
import { useAuth } from '~/context/auth';
// Se não estiver usando Expo, você precisará instalar uma biblioteca de ícones
// Ex: `react-native-vector-icons` e importá-la de forma diferente.

// Componente para a linha de detalhe (Email, Gênero, etc.)
const DetailRow = ({ label, value, isLast }) => (
  <View style={[styles.detailRow, !isLast && styles.detailRowBorder]}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const ProfileSettingsScreen = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      {/* Seção de Perfil Principal */}
      <View style={styles.profileSection}>
        <View style={styles.profilePicContainer}>
          <View style={styles.account}>
            <Text style={{ fontSize: 40, color: 'white' }}>{user?.nome.charAt(0)}</Text>
          </View>
        </View>
        {/* Nomes */}
        {/* <View style={styles.nameFields}>
          <Text style={styles.nameText}>{profile.firstName}</Text>
          <View style={styles.nameSeparator} />
          <Text style={styles.nameText}>{profile.lastName}</Text>
        </View> */}
      </View>

      {/* Seção de Detalhes */}
      <View style={styles.detailsSection}>
        <DetailRow label="Email" value={user?.email} />
        <DetailRow label="Plano" value={'Premium'} />
        {/* <DetailRow label="Age" value={profile.age} /> */}
        {/* <DetailRow label="Weight" value={profile.weight} /> */}
        {/* <DetailRow label="Height" value={profile.height} isLast={true} /> */}
      </View>

      {/* Botão DONE */}
      <TouchableOpacity style={styles.doneButton}>
        <Text style={styles.doneButtonText}>DONE</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  profilePicContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#ddd',
  },
  account: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#59b37f',
  },
  lockIconBackground: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#404040', // Cor do fundo do cadeado
    justifyContent: 'center',
    alignItems: 'center',
    // Adicionando uma borda branca para destacar (opcional)
    borderWidth: 2,
    borderColor: '#fff',
  },
  lockIcon: {
    // A cor é definida acima
    marginTop: 1, // Pequeno ajuste de alinhamento
    marginLeft: 1,
  },
  nameFields: {
    marginBottom: 15,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '400',
    paddingVertical: 5,
    // Linha pontilhada simulada - não é um campo de entrada real, mas parece um
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  nameSeparator: {
    height: 10, // Espaçamento entre os nomes
  },
  bioText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 20,
  },
  // --- Seção de Detalhes ---
  detailsSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  detailRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  // --- Botão DONE ---
  doneButton: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: '#3b82f6', // Cor azul vibrante
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // --- Espaçamento Inferior ---
  bottomSpacer: {
    height: 34, // Espaço para a barra de navegação inferior (simulada)
  },
});

export default ProfileSettingsScreen;
