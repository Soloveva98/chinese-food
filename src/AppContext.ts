import React, { createContext, RefObject } from 'react';

type ContextType = {
	sushiRef: RefObject<HTMLDivElement>;
	soupsRef: RefObject<HTMLDivElement>;
	saladsRef: RefObject<HTMLDivElement>;
	wokRef: RefObject<HTMLDivElement>;
	dessertRef: RefObject<HTMLDivElement>;
	drinkRef: RefObject<HTMLDivElement>;
	additivesRef: RefObject<HTMLDivElement>;
};

export const AppContext = createContext<ContextType>({} as ContextType);
