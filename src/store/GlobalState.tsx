// src/context/GlobalState.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// 1. Define the shape of your state
interface State {
	user: string | null;
	theme: 'light' | 'dark';
}

// 2. Define action types
type Action =
	| { type: 'SET_USER'; payload: string }
	| { type: 'TOGGLE_THEME' };

// 3. Initial state
const initialState: State = {
	user: null,
	theme: 'light',
};

// 4. Reducer function
function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, user: action.payload };
		case 'TOGGLE_THEME':
			return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
		default:
			return state;
	}
}

// 5. Context type
interface GlobalContextProps {
	state: State;
	dispatch: React.Dispatch<Action>;
}

// 6. Create context
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

// 7. Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<GlobalContext.Provider value={{ state, dispatch }}>
			{children}
		</GlobalContext.Provider>
	);
};

// 8. Custom hook
export const useGlobalState = (): GlobalContextProps => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error('useGlobalState must be used within a GlobalProvider');
	}
	return context;
};