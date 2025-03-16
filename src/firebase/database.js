import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from './config';

// Função para salvar um novo cálculo
export const salvarCalculo = async (userId, operacao, resultado) => {
  try {
    const docRef = await addDoc(collection(db, 'calculos'), {
      userId,
      operacao,
      resultado,
      dataCriacao: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Erro ao salvar cálculo:', error);
    throw error;
  }
};

// Função para buscar cálculos de um usuário
export const buscarCalculosUsuario = async (userId) => {
  try {
    const q = query(
      collection(db, 'calculos'),
      where('userId', '==', userId),
      orderBy('dataCriacao', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao buscar cálculos:', error);
    throw error;
  }
};

// Função para salvar perfil do usuário
export const salvarPerfil = async (userId, dadosPerfil) => {
  try {
    const docRef = await addDoc(collection(db, 'perfis'), {
      userId,
      ...dadosPerfil,
      dataCriacao: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Erro ao salvar perfil:', error);
    throw error;
  }
};

// Função para buscar perfil do usuário
export const buscarPerfil = async (userId) => {
  try {
    const q = query(
      collection(db, 'perfis'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw error;
  }
}; 