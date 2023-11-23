import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from './../../services/api';
import { StyledForm } from "./style";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const RegisterForm = () => {

    const { register, handleSubmit,reset } = useForm();

    const navigate = useNavigate();

    const createUser = async (formData) => {
        try{
            const { data } = await api.post('/users/', formData)
            navigate('/login')
            console.log(data)
        } catch(error) {
            toast('Usuario ou Email ja existe!', {
                style: {
                    backgroundColor: 'red',
                    color: 'white',
                },
            }
        )
            
        }
    }

    const submit = async (formData) => {
        await createUser(formData)
        // reset()
    }

    return (
        <StyledForm onSubmit={handleSubmit(submit)}>
            <h1>Cadastre-se!</h1>
            <label>Digite seu nome</label>
            <input type="text" {...register("username")} />
            <label>Digite seu Email</label>
            <input type="email" {...register("email")} />
            <label>Digite sua senha</label>
            <input type="password" {...register("password")} />
            <button>Cadastrar</button>
        </StyledForm>
    )
}