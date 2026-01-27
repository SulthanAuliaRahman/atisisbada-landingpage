import LandingFAQsWrapper from '@/components/server/LandingFAQs.server'
import React from 'react'

export const revalidate = 10; // second

const MitraPage = () => {
  return (
    <div>MitraPage
      <LandingFAQsWrapper/>
    </div>
  )
}

export default MitraPage