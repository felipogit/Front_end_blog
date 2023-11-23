import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../providers/UserContext';
import { StyledContainerPostPage } from './styled';

export const PostPage = () => {
    const { id } = useParams(); // Obtém o ID do post da URL
    const { posts } = useContext(UserContext);

    // Encontrar o post com base no ID da URL
    const selectedPost = posts.find((post) => post.id === Number(id));

    // Verificar se o post foi encontrado
    if (!selectedPost) {
        return <div>Post não encontrado.</div>;
    }

    // Renderizar os detalhes do post
    return (
        <StyledContainerPostPage>
            <div>
            <h1>{selectedPost.title}</h1>
            <p>{selectedPost.desc}</p>
            <p>{selectedPost.cat}</p>
            <p>Postado por: {selectedPost.user.username}</p>
            <p>Data: {new Date(selectedPost.date).toLocaleString()}</p>
            <img src={selectedPost.img.startsWith('http') ? selectedPost.img : `http://${selectedPost.img}`} alt={selectedPost.title} />
            </div>
            
        </StyledContainerPostPage>
    );
};
