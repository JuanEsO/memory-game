import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

export const useUser = () => {
    const { username, setUsername } = useContext(UserContext);
    return { username, setUsername };
}

