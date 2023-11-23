import { CreatePostForm } from "../../componets/CreatePostForm"
import { StyledContainerCreatePost } from "./styled"



export const CreatePostPage = () => {
    

    return (
        <StyledContainerCreatePost>
            <h1>Criar nova postagem</h1>
            <CreatePostForm />
            
        </StyledContainerCreatePost>
    )
}