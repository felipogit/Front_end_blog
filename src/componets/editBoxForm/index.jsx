import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext, UserProvider } from "../../providers/UserContext";
import { StyledFormEdit } from "./styled";

export const UpdatePostForm = ({ post, setIsEditing }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: post.title,
            desc: post.desc,
            cat: post.cat,
            img: post.img
        }
    });

    const { editPost } = useContext(UserContext)

    const submit = async (formData) => {
        editPost(formData, post.id);
        setIsEditing(false);
        
    }

    return (
        <StyledFormEdit onSubmit={handleSubmit(submit)}  >
            <div className="close" onClick={() => setIsEditing(false)} >X</div>
            <label>Titulo</label>
            <input type="text" {...register("title")} />
            <label>Descrição</label>
            <input type="text" {...register("desc")} />
            <label>Categoria</label>
            <input type="text" {...register("cat")} />
            <label >Selecionar imagem</label>
            <input type="file" {...register("img", { required: true })} />
            <button type="submit">Salvar</button>
        </StyledFormEdit>
    )

}