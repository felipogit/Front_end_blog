import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../providers/UserContext";
import { DeletingBox } from "../../componets/DeletingBox";
import { ModalUpdate } from "../../componets/ModalUpdate";
import { StyledContainerButton, StyledContainerHome, StyledHeader, StyledName } from "./styled";


export const HomePage = () => {
    const { user, userLogout, posts, deletePost, updateData, modalIsOpen } = useContext(UserContext);
    const [isDeleted, setIsDeleted] = useState(null);
    const [isEditing, setIsEditing] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    const handleSelectdPost = (post) => {
        console.log(post)
        setSelectedPost(post)
        setIsEditing(true)
    }
    console.log(posts)
    return (
        <StyledContainerHome>




            {user ? (
                <>
                    <StyledHeader>
                        <h1>Bem vindo ao Blog Santa Luzia 24 horas</h1>
                        <Link to="/posts/create">Faça uma Publicação</Link>

                    </StyledHeader>

                    <StyledName>
                        <div className="name">
                            <h1>Bem vindo {user.username}</h1>
                            <h2>Seu email :) {user.email}</h2>
                        </div>
                        <div className="logout">
                            <button onClick={userLogout}>Sair</button>
                        </div>
                    </StyledName>

                    {isDeleted ? (
                        <DeletingBox trueCallback={async () => {
                            await deletePost(isDeleted.id)
                            setIsDeleted(null)
                        }}
                            falseCallback={() => setIsDeleted(null)} >
                            <p>Tem certeza que deseja excluir este post?</p>
                        </DeletingBox>
                    ) : null}





                    <ul>
                        {posts
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((post) => (
                                <li key={post.id}>
                                    <Link to={`/post/${post.id}`}>
                                        <h2>{post.title}</h2>
                                        <p>{post.desc}</p>
                                    </Link>
                                    <p>{post.cat}</p>
                                    <strong>Postado por:{post.user.username}</strong>
                                    <p>Data: {new Date(post.date).toLocaleString()}</p>
                                    {post.img && (
                                        <img src={post.img.startsWith('http') ? post.img : `http://${post.img}`} alt={post.title} />
                                    )}
                                    <div className="buttons_update-delete" >
                                        <button onClick={() => setIsDeleted(post)}>Excluir</button>
                                        <button onClick={() => handleSelectdPost(post)}>Editar</button>
                                    </div>
                                </li>
                            ))}
                    </ul>



                    {isEditing ? <ModalUpdate post={selectedPost} setIsEditing={setIsEditing} /> : null}



                </>
            ) : (
                <>
                    <StyledHeader>
                        <h1>Bem vindo ao Blog Santa Luzia 24 horas</h1>
                        <p>Caso queira fazer alguma postagem, basta se cadastrar e entrar.</p>


                    </StyledHeader>

                    <StyledContainerButton>
                        <Link to="/register">Cadastre-se</Link>
                        <Link to="/login">Entrar</Link>
                    </StyledContainerButton>

                    <ul>
                        {posts
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((post) => (
                                <li key={post.id}>
                                    <Link to={`/post/${post.id}`}>
                                        <h3>{post.title}</h3>
                                        <p>{post.desc}</p>
                                    </Link>
                                    <p>{post.cat}</p>
                                    <p>Postado por: {post.user.username}</p>
                                    <p>Data: {new Date(post.date).toLocaleString()}</p>
                                    {post.img && (
                                        <img src={post.img.startsWith('http') ? post.img : `http://${post.img}`} alt={post.title} />
                                    )}
                                    <div className="buttons_update-delete" >
                                        <button onClick={() => setIsDeleted(post)}>Excluir</button>
                                        <button onClick={() => handleSelectdPost(post)}>Editar</button>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </>
            )}
        </StyledContainerHome>
    );
};
