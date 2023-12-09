import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router'

import { Root, AuthLayout, SuspenseLayout, UserLayout } from '../layouts'

// public routes
const Home = lazy(() => import('../pages/Home/Home'))
const About = lazy(() => import('../pages/About/About'))
const Blog = lazy(() => import('../pages/Blog/Blog'))
const Article = lazy(() => import('../pages/Article/Article'))
const Login = lazy(() => import('../pages/Login/Login'))
const RecoverPassword = lazy(() => import('../pages/recoverPassword/RecoverPassword'))
const ResetPassword = lazy(() => import('../pages/resetPassword/ResetPassword'))
const GeneratePassword = lazy(() => import('../pages/generatePassword/GeneratePassword'))
const ConflictMap = lazy(() => import('../pages/conflictMap/ConflictMap'))
const ReportConflict = lazy(() => import('../pages/ReportConflict/ReportConflict'))
const Material = lazy(() => import('../pages/Material/Material'))
const FilteredMaterial = lazy(() => import('../pages/Material/FilteredMaterial'))
const ProjectsAlliance = lazy(() => import('../pages/ProjectsAlliance/ProjectsAlliance'))
const DevTeam = lazy(() => import('../pages/DevTeam/DevTeam'))
import Error404 from '../pages/Error404/Error404'

// admin routes
const DashBoard = lazy(() => import('../pages/Admin/DashBoard/DashBoard'))
const ModalNewAdmin = lazy(() => import('../pages/Admin/DashBoard/ModalNewAdmin'))
const AdminAbout = lazy(() => import('../pages/Admin/About/About'))
const ModalAbout = lazy(() => import('../pages/Admin/About/ModalAbout'))
const AdminBlog = lazy(() => import('../pages/Admin/Blog/Blog'))
const ModalBlog = lazy(() => import('../pages/Admin/Blog/ModalBlog'))
const Project = lazy(() => import('../pages/Admin/Project/Project'))
const ModalProject = lazy(() => import('../pages/Admin/Project/ModalProject'))
const Alliance = lazy(() => import('../pages/Admin/Alliance/Alliance'))
const ModalAlliance = lazy(() => import('../pages/Admin/Alliance/ModalAlliance'))
const ConflictReports = lazy(() => import('../pages/Admin/Report/Report'))
const Conflict = lazy(() => import('../pages/Admin/Conflict/Conflict'))
const ModalConflict = lazy(() => import('../pages/Admin/Conflict/ModalConflict'))
const EditConflict = lazy(() => import('../pages/Admin/Conflict/EditConflict'))
const ModalCreateBanner = lazy(() => import('../pages/Admin/Banners/ModalCreate/ModalCreateBanners'))
const AdminBanners = lazy(() => import('../pages/Admin/Banners/Banners'))
const ModalEditBanner = lazy(() => import('../pages/Admin/Banners/ModalEditBanner'))
const Users = lazy(() => import('../pages/Admin/Users/Users'))

import AdminMaterial from '../pages/Admin/Material/Material'
import ModalMaterial from '../pages/Admin/Material/ModalMaterial'
import ChangePassword from '../pages/Admin/ChangePassword/ChangePassword'
import EditMember from '../pages/Admin/About/EditMember'
import EditAlliance from '../pages/Admin/Alliance/EditAlliance'
import EditProject from '../pages/Admin/Project/EditProject'

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
        <Route path="/devteam" element={<DevTeam />} />
        <Route path="*" element={<Error404 />} />
      </Route>
      <Route path="/admin" element={<UserLayout />}>
        <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="dashboard/add-administrator" element={<ModalNewAdmin />} />
        <Route path="banners" element={<AdminBanners />} />
        <Route path="banners/add-banner" element={<ModalCreateBanner />} />
        <Route path="banners/edit-banner/:id" element={<ModalEditBanner />} />
        <Route path="about" element={<AdminAbout />} />
        <Route path="about/add-member" element={<ModalAbout />} />
        <Route path="about/edit-member/:id" element={<EditMember />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="blog/add-article" element={<ModalBlog />} />
        <Route path="blog/edit-article/:id" element={<ModalBlog />} />
        <Route path="material" element={<AdminMaterial />} />
        <Route path="material/add-material" element={<ModalMaterial />} />
        <Route path="material/edit-material/:id" element={<ModalMaterial />} />
        <Route path="project" element={<Project />} />
        <Route path="project/add-project" element={<ModalProject />} />
        <Route path="project/edit-project/:id" element={<EditProject />} />
        <Route path="alliance" element={<Alliance />} />
        <Route path="alliance/add-alliance" element={<ModalAlliance />} />
        <Route path="alliance/edit-alliance/:id" element={<EditAlliance />} />
        <Route path="reports" element={<ConflictReports />} />
        <Route path="conflict" element={<Conflict />} />
        <Route path="conflict/add-conflict" element={<ModalConflict />} />
        <Route path="conflict/edit-conflict/:id" element={<EditConflict />} />
        <Route path="password" element={<ChangePassword />} />
        <Route path="users" element={<Users />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/recoverPassword" element={<RecoverPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/generatePassword" element={<GeneratePassword />} />
      </Route>
      <Route path="/" element={<SuspenseLayout />}>
        <Route path="/report" element={<ReportConflict />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
