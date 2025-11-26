import IUsuario from '../models/IUsuario';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, ReactNode, useEffect, useContext, createContext } from 'react';

// Define uma interface para os dados que o contexto de autenticação irá fornecer.
// A interface AuthContextData descreve a estrutura dos dados que
//serão disponibilizados no contexto.
export interface AuthContextData {
  signed: boolean;
  user: IUsuario | undefined;
  signIn(usuario: IUsuario): Promise<void>;
  signOut(): Promise<void>;
}

// Cria um contexto de autenticação.
const AuthContext = createContext<AuthContextData>({
  signed: false,
  user: undefined,
  signIn: async () => {},
  signOut: async () => {},
});

// Define o provedor de autenticação,
// que irá envolver os componentes que precisam acessar o contexto.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUsuario | undefined>(undefined); // Estado para armazenar os dados do usuário
  const [signed, setSigned] = useState<boolean>(false); // Estado para indicar se o usuário está autenticado

  useEffect(() => {
    // const loadStorageData = async () => {
    //   const storageUser = await AsyncStorage.getItem('@User');
    //   if (storageUser) {
    //     setUser(JSON.parse(storageUser));
    //     setSigned(true);
    //   }
    // };
    // loadStorageData();
  });

  // Função assíncrona para realizar o login.
  const signIn = async (usuario: IUsuario) => {
    await AsyncStorage.setItem('@User', JSON.stringify(usuario));
    setUser(usuario); // Armazena os dados do usuário no estado.
    setSigned(true); // Atualiza o estado para indicar que o usuário está autenticado.

    // Retorna uma promessa resolvida,
    // indicando que a operação de login foi bem-sucedida.
    return Promise.resolve();
  };

  // Função para realizar o logout.
  const signOut = async () => {
    await AsyncStorage.removeItem('@User');
    setUser(undefined);
    setSigned(false);
  };

  // Retorna o provedor do contexto,
  // passando os dados e funções necessárias para os componentes filhos.
  return (
    <AuthContext.Provider
      value={{
        signed,
        user,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// Já exporta o contexto usando o hook useContext para acessar o contexto de autenticação.
export const useAuth = () => {
  return useContext(AuthContext);
};
