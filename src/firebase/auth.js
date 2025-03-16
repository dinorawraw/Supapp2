import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './config';

// Função para criar novo usuário
export const criarUsuario = async (email, senha) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    return userCredential.user;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

// Função para fazer login
export const fazerLogin = async (email, senha) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    return userCredential.user;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// Função para fazer logout
export const fazerLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
};

// Função para observar mudanças no estado de autenticação
export const observarAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
}; 