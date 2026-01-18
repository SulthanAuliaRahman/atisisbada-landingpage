"use client";

import { useState, useEffect } from "react";
import { LogoPreview } from "@/components/LogoPreview";

const AdminFooter = () => {
  const [footerData, setFooterData] = useState({
    dataKantor: [
      { type: "logo", src: "", fileName: "", file: null as File | null },
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
  });

  useEffect(() => {
    async function fetchFooter() {
      try {
        const res = await fetch("/api/admin/footer");
        if (!res.ok) throw new Error("Failed to fetch footer data");
        const data = await res.json();

        const logoFromApi = data.dataKantor?.find(
          (item: any) => item.type === "logo",
        );

        const otherDataKantor =
          data.dataKantor?.filter((item: any) => item.type !== "logo") || [];

        const types = ["alamat", "telp", "email"];
        const mergedOtherData = types.map((type) => {
          const existing = otherDataKantor.find(
            (item: any) => item.type === type,
          );
          return existing || { type, text: "" };
        });

        const mergedDataKantor = [
          logoFromApi || { type: "logo", src: "", fileName: "" },
          ...mergedOtherData,
        ];

        setFooterData({
          dataKantor: mergedDataKantor,
          informasi: data.informasi || "",
          kontak: data.kontak?.length ? data.kontak : footerData.kontak,
          lokasi: data.lokasi?.length ? data.lokasi : footerData.lokasi,
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchFooter();
  }, []);

  const handleChange = (
    section: keyof typeof footerData,
    index: number | null,
    key: string | null,
    value: any,
  ) => {
    if (Array.isArray(footerData[section])) {
      const newArr = [...footerData[section]] as any[];
      if (index !== null && key !== null) {
        newArr[index][key] = value;
        setFooterData({ ...footerData, [section]: newArr });
      }
    } else {
      setFooterData({ ...footerData, [section]: value });
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      // Ambil file object, bukan fileName
      const logoItem = footerData.dataKantor.find((i) => i.type === "logo");
      const logoFile = logoItem?.file; // Ambil file object

      if (logoFile && logoFile instanceof File) {
        formData.append("logo", logoFile);
      }

      formData.append(
        "body",
        JSON.stringify({
          dataKantor: footerData.dataKantor,
          informasi: footerData.informasi,
          kontak: footerData.kontak,
          lokasi: footerData.lokasi,
        }),
      );

      const res = await fetch("/api/admin/footer", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to save");
      alert("Data berhasil disimpan!");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data");
    }
  };

  const getPreviewData = () => {
    return {
      dataKantor: footerData.dataKantor.map((item) => ({
        ...item,
        text:
          item.text ||
          (item.type === "alamat"
            ? "Jl. Lorem Ipsum Dolor Sit Amet"
            : item.type === "telp"
              ? "+62 lorem ipsum"
              : item.type === "email"
                ? "loremipsum@company.com"
                : ""),
      })),
      informasi:
        footerData.informasi ||
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      kontak: footerData.kontak,
      lokasi: footerData.lokasi.map((item, i) => ({
        ...item,
        value: item.value || (i === 0 ? "-6.200000" : "106.816666"),
      })),
      copyright: "© Copyright 2020 Pilar Wahana Artha | All Rights Reserved.",
    };
  };

  const previewData = getPreviewData();

  return (
    <div className="flex flex-col gap-6 p-6 w-full bg-background min-h-screen">
      {/* Form Panel - Grid 2 Kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Kantor */}
        <div className="bg-card shadow-md rounded-md p-4 space-y-4">
          <h3 className="font-semibold text-lg">Data Kantor</h3>
          <hr />
          {footerData.dataKantor.map((item, i) => (
            <div key={i} className="space-y-2">
              <label className="block font-medium text-sm">
                {item.type === "logo"
                  ? "Logo"
                  : item.type === "alamat"
                    ? "Alamat"
                    : item.type === "telp"
                      ? "Telepon"
                      : "Email"}
              </label>

              {item.type === "logo" ? (
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
                    {item.fileName || "Klik atau tarik file ke sini"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        handleChange("dataKantor", 0, "src", url);
                        handleChange("dataKantor", 0, "fileName", file.name);
                        handleChange("dataKantor", 0, "file", file);
                      }
                    }}
                  />
                </label>
              ) : (
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) =>
                    handleChange("dataKantor", i, "text", e.target.value)
                  }
                  placeholder={`Masukkan ${item.type}`}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
        </div>

        {/* Informasi */}
        <div className="bg-card shadow-md rounded-md p-4 space-y-4">
          <h3 className="font-semibold text-lg">Informasi</h3>
          <hr />
          <div className="space-y-2">
            <label className="block font-medium text-sm">Deskripsi</label>
            <textarea
              value={footerData.informasi}
              onChange={(e) =>
                handleChange("informasi", null, null, e.target.value)
              }
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={8}
              placeholder="Masukkan informasi perusahaan"
            />
          </div>
        </div>

        {/* Kontak */}
        <div className="bg-card shadow-md rounded-md p-4 space-y-4">
          <h3 className="font-semibold text-lg">Kontak</h3>
          <hr />
          {footerData.kontak.map((item, i) => (
            <div key={i} className="space-y-2">
              <label className="block font-medium text-sm">
                {item.platform}
              </label>
              <input
                type="text"
                value={item.url}
                onChange={(e) =>
                  handleChange("kontak", i, "url", e.target.value)
                }
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`URL ${item.platform}`}
              />
            </div>
          ))}
        </div>

        {/* Lokasi */}
        <div className="bg-card shadow-md rounded-md p-4 space-y-4">
          <h3 className="font-semibold text-lg">Lokasi</h3>
          <hr />
          {footerData.lokasi.map((item, i) => (
            <div key={i} className="space-y-2">
              <label className="block font-medium text-sm">{item.type}</label>
              <input
                type="text"
                value={item.value}
                onChange={(e) =>
                  handleChange("lokasi", i, "value", e.target.value)
                }
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Masukkan ${item.type}`}
              />
            </div>
          ))}

          <button
            type="button"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                  handleChange(
                    "lokasi",
                    0,
                    "value",
                    pos.coords.latitude.toString(),
                  );
                  handleChange(
                    "lokasi",
                    1,
                    "value",
                    pos.coords.longitude.toString(),
                  );
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
                {previewData.dataKantor.map((item, i) => (
                  <div key={i}>
                    {item.type === "logo" ? (
                      <LogoPreview
                        src={footerData.dataKantor[0]?.src}
                        onFileSelect={(file) =>
                          handleChange("dataKantor", 0, "file", file)
                        }
                      />
                    ) : (
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.type === "alamat"
                              ? "/Location.png"
                              : item.type === "telp"
                                ? "/Phone.png"
                                : "/Email.png"
                          }
                          alt={item.type}
                          className="h-5 w-5"
                        />
                        <span className="text-white text-sm">{item.text}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Kolom 2 - Informasi */}
              <div className="flex flex-col px-10 py-14 bg-footer">
                <h3 className="text-white text-lg font-semibold mb-3">
                  Informasi
                </h3>
                <p className="text-white/90 text-sm">{previewData.informasi}</p>
              </div>

              {/* Kolom 3 - Kontak */}
              <div className="flex flex-col px-10 py-14 bg-footer">
                <h3 className="footer-title text-lg font-semibold mb-3">
                  Kontak Kami
                </h3>
                <div className="flex gap-3">
                  {footerData.kontak.map((item, i) => {
                    // pilih ikon berdasarkan platform
                    const iconSrc =
                      item.platform === "Instagram"
                        ? "/Instagram.png"
                        : item.platform === "Whatsapp"
                          ? "/Whatsapp.png"
                          : "/Default.png";

                    // link khusus untuk Whatsapp
                    const href =
                      item.platform === "Whatsapp" && item.url
                        ? `https://wa.me/${item.url.replace(/\D/g, "")}`
                        : item.url || "#";

                    return (
                      <a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:opacity-80 transition"
                      >
                        <img
                          src={iconSrc}
                          alt={item.platform}
                          className="h-10 w-auto"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Kolom 4 - Lokasi */}
              <div className="flex flex-col px-10 py-14 bg-footer">
                <h3 className="text-white text-lg font-semibold mb-3">
                  Lokasi
                </h3>
                {previewData.lokasi[0].value && previewData.lokasi[1].value ? (
                  <iframe
                    title="Lokasi"
                    src={`https://maps.google.com/maps?q=${previewData.lokasi[0].value},${previewData.lokasi[1].value}&z=15&output=embed`}
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
                <p className="text-white/80 text-sm">{previewData.copyright}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFooter;
