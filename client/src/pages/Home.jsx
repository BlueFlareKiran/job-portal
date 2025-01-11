import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <JobListing/>
      <Footer/>
    </div>
  )
}
