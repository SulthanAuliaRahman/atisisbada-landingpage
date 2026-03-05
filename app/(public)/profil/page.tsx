import React from 'react'

import PengembangSectionWrapper from '@/components/server/PengembangSection.server';
import PerkembanganSectionWrapper from '@/components/server/PerkembanganSection.server';
import TopProfileSectionWrapper from '@/components/server/TopProfile.server';
import TentangPerusahaanSectionWrapper from '@/components/server/TentangPerusahaanSection.server';
import VisiMisiSectionWrapper from '@/components/server/VisiMisiSection.server';

export const revalidate = 10;

const profilPage = () => {
  return (
    <div className="bg-background overflow-x-hidden">
      <TopProfileSectionWrapper />
      <TentangPerusahaanSectionWrapper />
      <PerkembanganSectionWrapper/>
      <VisiMisiSectionWrapper />
      <PengembangSectionWrapper/>
    </div>
    
  )
}

export default profilPage