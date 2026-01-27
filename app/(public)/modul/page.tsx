import LandingFAQsWrapper from '@/components/server/LandingFAQs.server'
import React from 'react'

export const revalidate = 10; // second

const ModulPage = () => {
  return (
    <div>
      ModulPage
      <LandingFAQsWrapper/>
    </div>
  )
}

export default ModulPage