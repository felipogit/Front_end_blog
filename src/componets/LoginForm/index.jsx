import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from './../../providers/UserContext';
import { StyledFormLogin } from './styled';


export const LoginForm = () => {
   const { register, handleSubmit, reset } = useForm();

   const { userLogin } = useContext(UserContext);
   const submit = async (formData) => {
       userLogin(formData);
   }

    return (
        <StyledFormLogin onSubmit={handleSubmit(submit)}>
            <h1>Login</h1>
            <label>Digite seu usuario</label>
            <input type="username" {...register("username")} />
            <label>Digite sua senha</label>
            <input type="password" {...register("password")} />
            <button>Entrar</button>
        </StyledFormLogin>
    )
}