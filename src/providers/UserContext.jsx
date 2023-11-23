// UserProvider.js
import { createContext, useEffect } from "react";
import { useState } from "react";
import { api } from './../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser || null);
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const navigate = useNavigate();

    const currentPath = window.location.pathname;


    

    useEffect(() => {
        const loadPostsData = async () => {
            try {
                setLoading(true)
                const { data } = await api.get('posts/list')
                setPosts(data)
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        loadPostsData();
    }, [])

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    const userLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate('/');
    }

    const userLogin = async (formData) => {
        try {
            const { data } = await api.post('/login/', formData);
            localStorage.setItem("@TOKEN", data.access);
            setUser(data);
            navigate('/');
        } catch (error) {
            toast('Email ou senha inválidos, por favor tente novamente!', {
                style: {
                    backgroundColor: 'red',
                    color: 'white',
                },
            });
        }
    }

    const createPost = async (formData) => {
        try {
            const token = localStorage.getItem('@TOKEN');
            const postData = new FormData();
    
            // Adicione os campos de texto ao FormData
            postData.append('title', formData.title);
            postData.append('desc', formData.desc);
            postData.append('cat', formData.cat);
    
            // Verifique se há um arquivo e adicione-o ao FormData
            if (formData.img[0]) {
                postData.append('img', formData.img[0]);
            }
    
            const { data } = await api.post('posts/create/', postData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Certifique-se de adicionar esse cabeçalho
                },
            });
            console.log(data);
            setPosts((posts) => [...posts, data]);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = async (postId) => {
        const token = localStorage.getItem('@TOKEN');

        try {
            await api.delete(`posts/${postId}/destroy/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            setPosts((posts) => posts.filter((post) => post.id !== postId));

        } catch (error) {
            toast("Você não tem autorização para excluir este post!", {
                style: {
                    backgroundColor: 'red',
                    color: 'white',
                },
            })
        }
    }
    
    const editPost = async (formData, postId) => {
        console.log(postId);
        const postData = new FormData();
    
        // Adicione os campos de texto ao FormData
        postData.append('title', formData.title);
        postData.append('desc', formData.desc);
        postData.append('cat', formData.cat);

        // Verifique se há um arquivo e adicione-o ao FormData
        if (formData.img[0]) {
            postData.append('img', formData.img[0]);
        }

        try {
            const token = localStorage.getItem('@TOKEN');
            const { data } = await api.patch(`posts/${postId}/update/`, postData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            const filterPosts = posts.filter((post) => post.id !== postId);
            setPosts([...filterPosts, data]);
            
        } catch (error) {
            console.log(error);
            
        }
    }


    return (
        <UserContext.Provider value={{ setUser, userLogin, userLogout, user, posts, loading, createPost,
         setPosts, deletePost, editPost, modalIsOpen, setModalIsOpen }}>
            {children}
        </UserContext.Provider>
    )
}
