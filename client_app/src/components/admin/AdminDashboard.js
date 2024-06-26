import React,{useState} from 'react'
import AdminHero from './AdminHero'
import AdForm from './AdForm'
import { LoadingContext } from '../../context/loadingContext'

import AdminAds from './AdminAds'
import Footer from './Footer'

const AdminDashboard = () => {
  const [reload, setReload] = useState(false)
  return (
    <>
    <LoadingContext.Provider value={{reload, setReload}}>
       <AdminHero/>
       <AdForm />
       <AdminAds />
       <Footer/>
       </LoadingContext.Provider>
    </>

  )
}

export default AdminDashboard