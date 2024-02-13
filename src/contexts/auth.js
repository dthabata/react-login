import { createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const signup = (email, password) => {
        
        //TODO: Pegar valores, montar no objeto. Fazer chamada axios
        //TODO: Pegar retorno da chamada: se for sucesso, mandar pra login
        //TODO: Se for erro, avisar que deu o erro e qual foi o mesmo
        //TODO: Uma vez isso funcionando, tirar essa função também do contexto para tirar Context

        console.log("teste");
        const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
        const hasUser = usersStorage?.filter((user) => user.email === email);
    
        if (hasUser?.length) {
            return "Já existe uma conta com este e-mail";
        }

        let newUser;

        if (usersStorage) {
            newUser = [...usersStorage, { email, password }];
        } else {
            newUser = [{ email, password }];
        }

        localStorage.setItem("users_bd", JSON.stringify(newUser));

        return;
    };

    return (
        <AuthContext.Provider value={{signup}}>
            {children}
        </AuthContext.Provider>
    );
};
