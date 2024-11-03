import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const StoreContext = createContext();

const initialState = {
  stores: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_STORES':
      return { ...state, stores: action.payload };
    case 'ADD_STORE':
      return { ...state, stores: [...state.stores, action.payload] };
    case 'DELETE_STORE':
      return { ...state, stores: state.stores.filter(store => store.id !== action.payload) };
    default:
      return state;
  }
};


export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAllStores = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stores');
      console.log(response.data); // ตรวจสอบว่ามีการดึงข้อมูลมาได้หรือไม่
      dispatch({ type: 'SET_STORES', payload: response.data });
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };
  

  const addStore = async (storeData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/stores', storeData); // เพิ่มร้านค้าใหม่
      dispatch({ type: 'ADD_STORE', payload: response.data });
    } catch (error) {
      console.error('Error adding store:', error);
      throw error;
    }
  };

  const deleteStore = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stores/${id}`); // ลบร้านค้า
      dispatch({ type: 'DELETE_STORE', payload: id });
    } catch (error) {
      console.error('Error deleting store:', error);
    }
  };

  return (
    <StoreContext.Provider value={{ ...state, fetchAllStores }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
