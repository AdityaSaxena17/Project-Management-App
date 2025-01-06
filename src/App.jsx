import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import ContactMe from './components/ContactMe'
import Task from './components/Task'
import Layout from './components/partials/Layout'
import CreateTeam from './components/CreateTeam'
import Teams from './components/Teams'
import AboutMe from './components/AboutMe'
import TeamMenu from './components/TeamMenu'
import Announcements from './components/Announcements'
import Reports from './components/Reports'
import Register from './components/Register'

function App() {

  const router=createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
            path:"",
            element:<Home/>
          },
          {
            path:"login",
            element: <Login/>
          },
          {
            path:"signup",
            element: <Register/>,
          },
          {
            path: "contactme",
            element: <ContactMe/>
          },
          {
            path: "aboutme",
            element: <AboutMe/>
          },
          {
            path:"/teams",
            element: <TeamMenu/>
          },
          {
            path:"/teamslist",
            element: <Teams/>
          },
          {
            path:"/createTeam",
            element:<CreateTeam/>,
          },
          {
            path:"/teamslist/:teamid",
            element:<Task/>,
          },
          {
            path: "/teamslist/:teamid/announcements",
            element: <Announcements/>
          },
          {
            path: "/teamslist/:teamid/reports",
            element: <Reports/>
          }
      ]
    },
    
 ])



  return (
    <RouterProvider router={router}/>
  )
}

export default App
