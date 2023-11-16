import { lazy } from 'react'
import { Routes, Route } from 'react-router'

import { Root, AuthLayout, UserLayout } from '../layouts'

// public routes
const Home = lazy(() => import('../pages/Home/Home'))
const About = lazy(() => import('../pages/About/About'))
const Blog = lazy(() => import('../pages/Blog/Blog'))
const Article = lazy(() => import('../pages/Article/Article'))
const Login = lazy(() => import('../pages/Login/Login'))
const RecoverPassword = lazy(() => import('../pages/recoverPassword/RecoverPassword'))
const ResetPassword = lazy(() => import('../pages/resetPassword/ResetPassword'))
const ConflictMap = lazy(() => import('../pages/conflictMap/ConflictMap'))
const Material = lazy(() => import('../pages/Material/Material'))
const FilteredMaterial = lazy(() => import('../pages/Material/FilteredMaterial'))
const ProjectsAlliance = lazy(() => import('../pages/ProjectsAlliance/ProjectsAlliance'))
import Error404 from '../pages/Error404/Error404'

// admin routes
const DashBoard = lazy(() => import('../pages/Admin/DashBoard/DashBoard'))
const AdminAbout = lazy(() => import('../pages/Admin/About/About'))
const ModalAbout = lazy(() => import('../pages/Admin/About/ModalAbout'))
const AdminBlog = lazy(() => import('../pages/Admin/Blog/Blog'))
const ModalBlog = lazy(() => import('../pages/Admin/Blog/ModalBlog'))
const Project = lazy(() => import('../pages/Admin/Project/Project'))
const ModalProject = lazy(() => import('../pages/Admin/Project/ModalProject'))
const Alliance = lazy(() => import('../pages/Admin/Alliance/Alliance'))
const ModalAlliance = lazy(() => import('../pages/Admin/Alliance/ModalAlliance'))
import AdminMaterial from '../pages/Admin/Material/Material'
import ModalMaterial from '../pages/Admin/Material/ModalMaterial'
import ChangePassword from '../pages/Admin/ChangePassword/ChangePassword'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Article />} />
        <Route path="/conflict" element={<ConflictMap />} />
        <Route path="/project" element={<ProjectsAlliance />} />
        <Route path="/material" element={<Material />} />
        <Route path="/material/:id" element={<FilteredMaterial />} />
      </Route>
      <Route path="/admin" element={<UserLayout />}>
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="about" element={<AdminAbout />} />
        <Route path="about/add-member" element={<ModalAbout />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="blog/add-article" element={<ModalBlog />} />
        <Route path="material" element={<AdminMaterial />} />
        <Route path="material/add-material" element={<ModalMaterial />} />
        <Route path="project" element={<Project />} />
        <Route path="project/add-project" element={<ModalProject />} />
        <Route path="alliance" element={<Alliance />} />
        <Route path="alliance/add-alliance" element={<ModalAlliance />} />
        <Route path="password" element={<ChangePassword />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/recoverPassword" element={<RecoverPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

export default AppRoutes
