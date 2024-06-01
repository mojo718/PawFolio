import { createContext, useContext, useState } from 'react';

const PetContext = createContext();

export const usePetContext = () => useContext(PetContext)