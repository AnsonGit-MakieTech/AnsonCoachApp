// src/context/GlobalState.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { MemberType } from '../types/MemberType';

// 1. Define the shape of your state
interface State {
	user: string | null;
	theme: 'light' | 'dark';
	tab : 'members' | 'record' | 'remark',
	member : MemberType | null,
	requestUrl : string | null,
	picture : string | null,
	sessionCount : number,
	logTime : string,
	accountId : number,
}

// 2. Define action types
type Action =
	| { type: 'SET_USER'; payload: string }
	| { type: 'TOGGLE_THEME' }
	| { type: 'SET_TAB'; payload: 'members' | 'record' | 'remark' }
	| { type: 'SET_MEMBER'; payload: MemberType | null }
	| { type: 'SET_REQUEST_URL'; payload: string | null }
	| { type: 'SET_PICTURE'; payload: string | null }
	| { type: 'SET_SESSION_COUNT'; payload: number }
	| { type: 'SET_LOG_TIME'; payload: string }
	| { type: 'SET_ACCOUNT_ID'; payload: number }
	| { type: 'CLEAR' };

// 3. Initial state
const initialState: State = {
	user: null,
	theme: 'light',
	tab : 'members',
	member : null,
	requestUrl : null,
	picture : null,
	sessionCount : 0,
	logTime : "--:-- --",
	accountId : 0,
};

// 4. Reducer function
function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, user: action.payload };
		case 'TOGGLE_THEME':
			return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
		case 'SET_TAB':
			return { ...state, tab: action.payload };
		case 'SET_MEMBER':
			return { ...state, member: action.payload };
		case 'SET_REQUEST_URL':
			return { ...state, requestUrl: action.payload };
		case 'SET_PICTURE':
			return { ...state, picture: action.payload };
		case 'SET_SESSION_COUNT':
			return { ...state, sessionCount: action.payload };
		case 'SET_LOG_TIME':
			return { ...state, logTime: action.payload };
		case 'CLEAR':
			return initialState;
		case 'SET_ACCOUNT_ID':
			return { ...state, accountId: action.payload };
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