import { useContext } from "react"
import { useForm } from "react-hook-form"
import { UserContext } from './../../providers/UserContext';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { StyledFormCreatePost } from "./styled";


export const CreatePostForm = () => {
    const { register, handleSubmit, reset } = useForm()

    const { user, createPost  } = useContext(UserContext)
    const navigate = useNavigate()
    

    const submit = async (formData) => {
        createPost(formData);
        toast("Post criado com sucesso!", {
            style: {
                backgroundColor: 'green',
                color: 'white',
            },
        })
        reset();
        navigate('/');
    }

    return (
        <StyledFormCreatePost onSubmit={handleSubmit(submit)}  >
            <label>Titulo</label>
            <input type="text" {...register("title")} />
            <label>Descrição</label>
            <input type="text" {...register("desc")} />
            <label>Categoria</label>
            <input type="text" {...register("cat")} />
            <label >Selecionar imagem</label>
            <input className="input" type="file" {...register("img", { required: true })}/>
                <button type="submit">Criar</button>
        </StyledFormCreatePost>
    )

}