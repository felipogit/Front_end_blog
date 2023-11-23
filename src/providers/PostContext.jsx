import { createContext, useEffect } from "react"
import { useState } from "react"
import { api } from "../services/api"

export const PostContext = createContext()



const createPost = async (formData) => {
    try {
        const token = localStorage.getItem('@TOKEN')
        const { data } = await api.post('posts/create/', formData,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export const PostProvider = ({ children }) => {
    return (
      <PostContext.Provider value={{ createPost }}>
        {children}
      </PostContext.Provider>
    );
  };
  