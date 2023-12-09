import React, { Suspense } from 'react'
import { Outlet } from 'react-router'
import { Loader } from '../components/ui/Loader/Loader'
import { Container } from 'react-bootstrap'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './rootLayout.css'

export const Root = () => {
  return (
    <Suspense fallback={<Loader fullHeight />}>
      <Navbar />
      <main className="main-wrapper">
        <Container fluid="md">
          <Outlet />
        </Container>
      </main>
      <Footer />
    </Suspense>
  )
}
