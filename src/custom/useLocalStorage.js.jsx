import {useState} from 'react';

export function useLocalStorage (key, initialValue) {
    const [storedValue, setstoredValue] = useState(() =>{
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error){
            return initialValue;
        }
    });

    const setValue = value => {
        try{
            setstoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(error)
        }
    }

    return [storedValue, setValue]
}