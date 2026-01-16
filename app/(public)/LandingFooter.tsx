"use client";

import dynamic from "next/dynamic";
const FooterMap = dynamic(() => import("../../components/FooterMap.tsx"), {
  ssr: false,
});

const LandingFooter = () => {
  return (
    <footer className="bg-footer">
      <div className="mx-auto max-w-[1600px] w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-[1fr_auto] gap-0 w-full">
          <div className="bg-[#285d8e] row-span-2 flex flex-col px-10 py-14 gap-4">
            <h3 className="text-white text-lg font-medium">Kolom 1</h3>
            <div className="flex items-center gap-3">
              <img src="/Location.png" className="h-5 w-5" />
              <span className="text-white text-sm">Item pertama</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/Phone.png" className="h-5 w-5" />
              <span className="text-white text-sm">Item kedua</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/Email.png" className="h-5 w-5" />
              <span className="text-white text-sm">Item ketiga</span>
            </div>
          </div>

          <div className="flex flex-col px-10 py-14">
            <h3 className="footer-title">Informasi</h3>
            <p className="footer-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="flex flex-col px-10 py-14">
            <h3 className="footer-title">Kontak Kami</h3>
            <div className="flex gap-3">
              <img src="/Instagram.png" className="h-10 w-auto" />
              <img src="/Whatsapp.png" className="h-10 w-auto" />
            </div>
          </div>

          <div className="flex flex-col px-10 py-14">
            <h3 className="footer-title">Navigasi Alamat</h3>
            <iframe
              title="Gedung Sate"
              src={`https://maps.google.com/maps?q=-6.90096,107.61861&z=15&output=embed`}
              className="w-full h-48 rounded border-0"
            />
          </div>

          <div className="md:col-span-3 px-10 py-6 flex items-center justify-center">
            <p className="footer-text">
              © Copyright 2026 Pilar Wahana Artha | All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
