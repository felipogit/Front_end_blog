import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { PostPage } from "../pages/PostPage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { CreatePostPage } from "../pages/CreatePostPage";
import { ProtectedRoutes } from "../componets/ProtectedRoutes";
import { PublicRoutes } from "../componets/PublicRoutes";


export const RoutesMain = () => {

    return (

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<PublicRoutes />}>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>
            
            <Route path="/post/:id" element={<PostPage />} />

            <Route element={<ProtectedRoutes />}>
            <Route path="/posts/create" element={<CreatePostPage />} />
            </Route>
           
        </Routes>

    )
}