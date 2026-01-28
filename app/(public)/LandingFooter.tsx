"use client";

import { useEffect, useState } from "react";
import { LogoPreview } from "@/components/LogoPreview";

const defaultFooterData = {
  logoSrc: "",
  logoFileName: "",
  logoFile: null as File | null,
  alamat: "",
  telp: "",
  email: "",
  deskripsi: "",
  instagram: "",
  whatsapp: "",
  latitude: "",
  longitude: "",
};

const LandingFooter = () => {
  const [footerData, setFooterData] = useState(defaultFooterData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/footer")
      .then((res) => res.json())
      .then((data) => {
        setFooterData({
          ...defaultFooterData,
          ...data,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const alamat = footerData.alamat || "Lorem ipsum dolor sit amet";
  const telp = footerData.telp || "0000000000";
  const email = footerData.email || "lorem@ipsum.com";
  const informasi =
    footerData.deskripsi ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  const lat = footerData.latitude || 0;
  const lng = footerData.longitude || 0;

  return (
    <footer className="bg-footer">
      <div className="mx-auto max-w-[1600px] w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-[1fr_auto]">
          <div className="bg-[#285d8e] row-span-2 flex flex-col px-10 py-14 gap-4">
            <LogoPreview src="/logo.png" />
            <div className="flex items-center gap-3">
              <img src="/Location.png" className="h-5 w-5" alt="Location" />
              <span className="text-white text-sm">{alamat}</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/Phone.png" className="h-5 w-5" alt="Phone" />
              <span className="text-white text-sm">{telp}</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/Email.png" className="h-5 w-5" alt="Email" />
              <span className="text-white text-sm">{email}</span>
            </div>
          </div>
          <div className="flex flex-col px-10 py-14">
            <h3 className="text-white text-lg font-semibold mb-3">Informasi</h3>
            <p className="text-white/90 text-sm">{informasi}</p>
          </div>
          <div className="flex flex-col px-10 py-14">
            <h3 className="text-white text-lg font-semibold mb-3">
              Kontak Kami
            </h3>
            <div className="flex gap-3">
              <a
                href={
                  footerData.instagram
                    ? `https://instagram.com/${footerData.instagram}`
                    : "https://instagram.com"
                }
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/Instagram.png"
                  className="h-15 w-auto"
                  alt="Instagram"
                />
              </a>
              <a
                href={
                  footerData.whatsapp
                    ? `https://wa.me/${footerData.whatsapp.replace(/\D/g, "")}`
                    : "https://wa.me/"
                }
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/Whatsapp.png"
                  className="h-15 w-auto"
                  alt="Whatsapp"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col px-10 py-14">
            <h3 className="text-white text-lg font-semibold mb-3">
              Navigasi Alamat
            </h3>
            {lat && lng ? (
              <iframe
                title="Lokasi"
                src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
                className="w-full h-48 rounded border-0"
              />
            ) : (
              <iframe
                title="Lokasi"
                src="https://maps.google.com/maps?q=-6.90096,107.61861&z=15&output=embed"
                className="w-full h-48 rounded border-0"
              />
            )}
          </div>
          <div className="md:col-span-3 px-10 py-6 flex items-center justify-center">
            <p className="text-white/80 text-sm">
              © Copyright 2026 Pilar Wahana Artha | All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
