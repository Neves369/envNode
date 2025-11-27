import { useAuth } from '~/context/auth';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';

const DetailRow = ({ label, value, isLast }: any) => (
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
            <Text style={{ fontSize: 40, color: '#59b37f' }}>{user?.nome.charAt(0)}</Text>
          </View>
        </View>
      </View>

      {/* Seção de Detalhes */}
      <View style={styles.detailsSection}>
        <DetailRow label="Nome" value={user?.nome} isLast={false} />
        <DetailRow label="Email" value={user?.email} isLast={false} />
        <DetailRow label="Plano" value={'Premium'} isLast={true} />
      </View>

      {/* Botão DONE */}
      <TouchableOpacity style={styles.doneButton}>
        <Text style={styles.doneButtonText}>SALVAR</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#438a60',
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
    backgroundColor: 'white',
  },
  lockIconBackground: {
    right: 0,
    bottom: 0,
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 12,
    position: 'absolute',
    alignItems: 'center',
    borderColor: '#fff',
    justifyContent: 'center',
    backgroundColor: '#404040', // Cor do fundo do cadeado
  },
  lockIcon: {
    marginTop: 1,
    marginLeft: 1,
  },
  nameFields: {
    marginBottom: 15,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '400',
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  nameSeparator: {
    height: 10, // Espaçamento entre os nomes
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 20,
  },
  // --- Seção de Detalhes ---
  detailsSection: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  detailRowBorder: {
    borderBottomColor: '#f3f3f3',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  detailLabel: {
    fontSize: 16,
    color: 'white',
  },
  detailValue: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
  },
  // --- Botão DONE ---
  doneButton: {
    marginTop: 30,
    borderRadius: 8,
    paddingVertical: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#59b37f',
  },
});

export default ProfileSettingsScreen;
