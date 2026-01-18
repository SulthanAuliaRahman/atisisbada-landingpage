"use client";

import { useEffect, useState } from "react";
import { LogoPreview } from "@/components/LogoPreview";

const defaultFooterData = {
  dataKantor: [
    { type: "logo", src: "" },
    { type: "alamat", text: "" },
    { type: "telp", text: "" },
    { type: "email", text: "" },
  ],
  informasi: "",
  kontak: [
    { platform: "Instagram", url: "" },
    { platform: "Whatsapp", url: "" },
  ],
  lokasi: [
    { type: "Latitude", value: "" },
    { type: "Longitude", value: "" },
  ],
  copyright: "",
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

  const alamat =
    footerData.dataKantor.find((i) => i.type === "alamat")?.text ||
    "Lorem ipsum dolor sit amet";
  const telp =
    footerData.dataKantor.find((i) => i.type === "telp")?.text || "0000000000";
  const email =
    footerData.dataKantor.find((i) => i.type === "email")?.text ||
    "lorem@ipsum.com";
  const informasi =
    footerData.informasi ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  const lat = footerData.lokasi[0]?.value;
  const lng = footerData.lokasi[1]?.value;

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
                href={footerData.kontak[0]?.url || "#"}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/Instagram.png"
                  className="h-10 w-auto"
                  alt="Instagram"
                />
              </a>
              <a
                href={
                  footerData.kontak[1]?.url
                    ? `https://wa.me/${footerData.kontak[1].url.replace(/\D/g, "")}`
                    : "#"
                }
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/Whatsapp.png"
                  className="h-10 w-auto"
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
              {footerData.copyright ||
                "© Copyright 2026 Pilar Wahana Artha | All rights reserved."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
