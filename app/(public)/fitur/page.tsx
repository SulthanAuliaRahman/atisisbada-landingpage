"use client";

import { useState, useEffect } from "react";
import LandingModule from "@/app/(public)/LandingModule";
import LandingFaqs from "@/app/(public)/LandingFAQs";

const FiturPage = () => {
  const fiturPageData = [
    {
      no: 1,
      ikon: "/fitur/input-gambar.svg",
      nama: "Input Gambar",
      deskripsi: "Tambah, ubah, dan atur hak akses pengguna.",
    },
    {
      no: 2,
      ikon: "/fitur/dokumen.svg",
      nama: "Dokumen, Sertifikat dll",
      deskripsi: "Pantau data dan aktivitas secara langsung.",
    },
    {
      no: 3,
      ikon: "/fitur/terhubung.svg",
      nama: "Terhubung 24 Jam",
      deskripsi: "Hubungkan sistem dengan layanan lain.",
    },
    {
      no: 4,
      ikon: "/fitur/koordinat.svg",
      nama: "Koordinat Lokasi",
      deskripsi: "Lindungi data dengan kontrol dan enkripsi.",
    },
    {
      no: 5,
      ikon: "/fitur/barcode.svg",
      nama: "Barcode & QR Code",
      deskripsi: "Lindungi data dengan kontrol dan enkripsi.",
    },
    {
      no: 6,
      ikon: "/fitur/barcode.svg",
      nama: "Barcode & QR Code",
      deskripsi: "Lindungi data dengan kontrol dan enkripsi.",
    },
    {
      no: 7,
      ikon: "/fitur/barcode.svg",
      nama: "Barcode & QR Code",
      deskripsi: "Lindungi data dengan kontrol dan enkripsi.",
    },
    {
      no: 8,
      ikon: "/fitur/barcode.svg",
      nama: "Barcode & QR Code",
      deskripsi: "Lindungi data dengan kontrol dan enkripsi.",
    },
    {
      no: 9,
      ikon: "/fitur/barcode.svg",
      nama: "Barcode & QR Code",
      deskripsi: "Lindungi data dengan kontrol dan enkripsi.",
    },
  ];
  const getItemsPerSlide = () => {
    if (typeof window === "undefined") return 8;
    if (window.innerWidth < 640) return 4;
    if (window.innerWidth < 1024) return 6;
    return 8;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(8);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const update = () => setItemsPerSlide(getItemsPerSlide());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setSlide(0);
  }, [itemsPerSlide]);

  const totalSlide = Math.ceil(fiturPageData.length / itemsPerSlide);

  const currentData = fiturPageData.slice(
    slide * itemsPerSlide,
    slide * itemsPerSlide + itemsPerSlide,
  );
  return (
    <div>
      {" "}
      <div className="bg-[#D9D9D9] px-6 py-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8">
          {" "}
          Fitur{" "}
        </h2>
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlide }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full bg-[#0489D4] transition-all ${
                i === slide ? "w-10" : "w-4"
              }`}
            />
          ))}
        </div>
        <div className="relative">
          {slide > 0 && (
            <button
              onClick={() => setSlide(slide - 1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl z-10"
            >
              ‹
            </button>
          )}

          {slide < totalSlide - 1 && (
            <button
              onClick={() => setSlide(slide + 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-4xl z-10"
            >
              ›
            </button>
          )}

          <div className="overflow-hidden min-h-[260px]">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                width: `${totalSlide * 100}%`,
                transform: `translateX(-${slide * (100 / totalSlide)}%)`,
              }}
            >
              {Array.from({ length: totalSlide }).map((_, slideIndex) => {
                const slideData = fiturPageData.slice(
                  slideIndex * itemsPerSlide,
                  slideIndex * itemsPerSlide + itemsPerSlide,
                );

                return (
                  <div
                    key={slideIndex}
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / totalSlide}%` }}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                      {" "}
                      {slideData.map((item) => (
                        <div
                          key={item.no}
                          className="flex flex-col items-center text-center gap-3"
                        >
                          {" "}
                          <img
                            src={item.ikon}
                            alt={item.nama}
                            className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                          />{" "}
                          <span className="text-sm sm:text-base font-medium">
                            {" "}
                            {item.nama}{" "}
                          </span>{" "}
                        </div>
                      ))}{" "}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <LandingModule />
      <LandingFaqs />
    </div>
  );
};

export default FiturPage;

