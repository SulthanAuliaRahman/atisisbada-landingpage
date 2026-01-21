"use client";
import { useState, useEffect } from "react";
import { LogoPreview } from "@/components/LogoPreview";
import {
  extractInstagramUsername,
  extractWhatsAppNumber,
} from "@/app/utils/ExtractLink";

const AdminFooter = () => {
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [footerData, setFooterData] = useState({
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
  });

  useEffect(() => {
    async function fetchFooter() {
      try {
        const res = await fetch("/api/admin/footer");
        if (!res.ok) throw new Error("Failed to fetch footer data");
        const data = await res.json();

        setFooterData({
          logoSrc: data.logoSrc || "",
          logoFileName: data.logoFileName || "",
          logoFile: null,
          alamat: data.alamat || "",
          telp: data.telp || "",
          email: data.email || "",
          deskripsi: data.deskripsi || "",
          instagram: data.instagram || "",
          whatsapp: data.whatsapp || "",
          latitude: data.latitude || "",
          longitude: data.longitude || "",
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchFooter();
  }, []);

  const handleChange = (key: keyof typeof footerData, value: any) => {
    let cleanedValue = value;

    if (key === "instagram") {
      cleanedValue = extractInstagramUsername(value);
    } else if (key === "whatsapp") {
      cleanedValue = extractWhatsAppNumber(value);
    }

    setFooterData((prev) => ({
      ...prev,
      [key]: cleanedValue,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage(null);
    setErrors({});

    try {
      const formData = new FormData();

      if (footerData.logoFile) {
        formData.append("logo", footerData.logoFile);
      }

      formData.append(
        "body",
        JSON.stringify({
          alamat: footerData.alamat,
          telp: footerData.telp,
          email: footerData.email,
          deskripsi: footerData.deskripsi,
          instagram: footerData.instagram,
          whatsapp: footerData.whatsapp,
          latitude: footerData.latitude,
          longitude: footerData.longitude,
        }),
      );

      const res = await fetch("/api/admin/footer", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        setSaveMessage(result.message || "Gagal menyimpan");
        if (result.errors) {
          setErrors(result.errors);
        }
        return;
      }

      console.log("tes");
      setSaveMessage("Data berhasil disimpan");
    } catch (e) {
      setSaveMessage("Server tidak merespons");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 w-full bg-background min-h-screen">
      {saveMessage && (
        <div
          className={`p-3 rounded text-sm ${
            saveMessage === "Data berhasil disimpan"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {saveMessage}
        </div>
      )}
      {/* Form Panel - Grid 2 Kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Kantor */}
        <div className="bg-card shadow-md rounded-md p-4 space-y-4">
          <h3 className="font-semibold text-lg">Data Kantor</h3>
          <hr />

          {/* Logo */}
          <div className="space-y-2">
            <label className="block font-medium text-sm">Logo</label>
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0-6l-3 3m3-3l3 3M12 6v6"
                />
              </svg>
              <span className="text-gray-500 text-sm">
                {footerData.logoFileName || "Klik atau tarik file ke sini"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setFooterData((prev) => ({
                    ...prev,
                    logoSrc: URL.createObjectURL(file),
                    logoFileName: file.name,
                    logoFile: file,
                  }));
                }}
              />
              {errors.logo && (
                <p className="text-red-600 text-xs mt-1">{errors.logo}</p>
              )}
            </label>
          </div>

          {/* Alamat */}
          <div className="space-y-2">
            <label className="block font-medium text-sm">Alamat</label>
            <input
              type="text"
              value={footerData.alamat}
              onChange={(e) => handleChange("alamat", e.target.value)}
              placeholder="Masukkan alamat"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.alamat && (
              <p className="text-red-600 text-xs mt-1">{errors.alamat}</p>
            )}
          </div>

          {/* Telepon */}
          <div className="space-y-2">
            <label className="block font-medium text-sm">Telepon</label>
            <input
              type="text"
              value={footerData.telp}
              onChange={(e) => handleChange("telp", e.target.value)}
              placeholder="Masukkan telepon"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.telp && (
              <p className="text-red-600 text-xs mt-1">{errors.telp}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block font-medium text-sm">Email</label>
            <input
              type="text"
              value={footerData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Masukkan email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Informasi */}
        <div className="bg-card shadow-md rounded-md p-4 space-y-4">
          <h3 className="font-semibold text-lg">Informasi</h3>
          <hr />
          <div className="space-y-2">
            <label className="block font-medium text-sm">Deskripsi</label>
            <textarea
              value={footerData.deskripsi}
              onChange={(e) => handleChange("deskripsi", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={8}
              placeholder="Masukkan informasi perusahaan"
            />
            {errors.deskripsi && (
              <p className="text-red-600 text-xs mt-1">{errors.deskripsi}</p>
            )}
          </div>
        </div>

        {/* Kontak */}
        <div className="bg-card shadow-md rounded-md p-4 space-y-4">
          <h3 className="font-semibold text-lg">Kontak</h3>
          <hr />

          <div className="space-y-2">
            <label className="block font-medium text-sm">Instagram</label>
            <input
              type="text"
              value={footerData.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="URL Instagram"
            />
            {errors.instagram && (
              <p className="text-red-600 text-xs mt-1">{errors.instagram}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-sm">Whatsapp</label>
            <input
              type="text"
              value={footerData.whatsapp}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nomor Whatsapp"
            />
            {errors.whatsapp && (
              <p className="text-red-600 text-xs mt-1">{errors.whatsapp}</p>
            )}
          </div>
        </div>

        {/* Lokasi */}
        <div className="bg-card shadow-md rounded-md p-4 space-y-4">
          <h3 className="font-semibold text-lg">Lokasi</h3>
          <hr />

          <div className="space-y-2">
            <label className="block font-medium text-sm">Latitude</label>
            <input
              type="text"
              value={footerData.latitude}
              onChange={(e) => handleChange("latitude", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Latitude"
            />
            {errors.latitude && (
              <p className="text-red-600 text-xs mt-1">{errors.latitude}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-sm">Longitude</label>
            <input
              type="text"
              value={footerData.longitude}
              onChange={(e) => handleChange("longitude", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Longitude"
            />
            {errors.longitude && (
              <p className="text-red-600 text-xs mt-1">{errors.longitude}</p>
            )}
          </div>

          <button
            type="button"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                  handleChange("latitude", pos.coords.latitude.toString());
                  handleChange("longitude", pos.coords.longitude.toString());
                });
              } else {
                alert("Geolocation tidak tersedia di browser ini");
              }
            }}
          >
            Gunakan Lokasi Saat Ini
          </button>
        </div>
      </div>

      {/* Tombol Simpan */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Simpan Perubahan
        </button>
      </div>

      {/* Preview Panel */}
      <div className="bg-card shadow-lg rounded-md p-6">
        <h2 className="font-bold text-xl mb-4 text-gray-800">Preview Footer</h2>
        <div className="bg-gray-100 overflow-hidden rounded">
          <div className="mx-auto max-w-[1600px] w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-[1fr_auto] gap-0 w-full">
              {/* Kolom 1 - Data Kantor */}
              <div className="bg-[#285d8e] row-span-2 flex flex-col px-10 py-14 gap-4">
                <LogoPreview
                  src={footerData.logoSrc}
                  onFileSelect={(file) => handleChange("logoFile", file)}
                />

                <div className="flex items-center gap-3">
                  <img src="/Location.png" alt="location" className="h-5 w-5" />
                  <span className="text-white text-sm">
                    {footerData.alamat || "Jl. Lorem Ipsum Dolor Sit Amet"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img src="/Phone.png" alt="phone" className="h-5 w-5" />
                  <span className="text-white text-sm">
                    {footerData.telp || "+62 lorem ipsum"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img src="/Email.png" alt="email" className="h-5 w-5" />
                  <span className="text-white text-sm">
                    {footerData.email || "loremipsum@company.com"}
                  </span>
                </div>
              </div>

              {/* Kolom 2 - Informasi */}
              <div className="flex flex-col px-10 py-14 bg-footer">
                <h3 className="text-white text-lg font-semibold mb-3">
                  Informasi
                </h3>
                <p className="text-white/90 text-sm">
                  {footerData.deskripsi ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </p>
              </div>

              {/* Kolom 3 - Kontak */}
              <div className="flex flex-col px-10 py-14 bg-footer">
                <h3 className="footer-title text-lg font-semibold mb-3">
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
                    className="hover:opacity-80 transition"
                  >
                    <img
                      src="/Instagram.png"
                      alt="Instagram"
                      className="h-10 w-auto"
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
                    className="hover:opacity-80 transition"
                  >
                    <img
                      src="/Whatsapp.png"
                      alt="Whatsapp"
                      className="h-10 w-auto"
                    />
                  </a>
                </div>
              </div>

              {/* Kolom 4 - Lokasi */}
              <div className="flex flex-col px-10 py-14 bg-footer">
                <h3 className="text-white text-lg font-semibold mb-3">
                  Lokasi
                </h3>
                {footerData.latitude && footerData.longitude ? (
                  <iframe
                    title="Lokasi"
                    src={`https://maps.google.com/maps?q=${footerData.latitude},${footerData.longitude}&z=15&output=embed`}
                    className="w-full h-40 rounded border-0"
                  />
                ) : (
                  <div className="w-full h-40 bg-white/10 rounded flex items-center justify-center text-white/70 text-sm">
                    Map Preview
                  </div>
                )}
              </div>

              {/* Copyright - Span 3 kolom */}
              <div className="md:col-span-3 px-10 py-6 flex items-center justify-center bg-footer">
                <p className="text-white/80 text-sm">
                  © Copyright 2020 Pilar Wahana Artha | All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFooter;
