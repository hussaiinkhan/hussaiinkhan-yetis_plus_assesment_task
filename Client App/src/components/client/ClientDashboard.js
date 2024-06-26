import React,{useState} from 'react'
import ClientHero from './ClientHero'
import ClientAds from './ClientAds'
import { LoadingContext } from '../../context/loadingContext'
import Footer from '../admin/Footer'

const ClientDashboard = () => {
  const [reload, setReload] = useState(false)
  return (
    <>
      <LoadingContext.Provider value={{reload, setReload}}>
          <ClientHero/>
          <ClientAds/>
          <Footer/>
        </LoadingContext.Provider>
    </>

  )
}

export default ClientDashboard