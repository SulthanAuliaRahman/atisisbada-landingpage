"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProfileKantor = {
  id?: string;
  Visi?: string;
  Misi?: string;
  Profile_text?: string;
  Tentang_text?: string;
};

interface Props {
  initialData: ProfileKantor | null;
}

export default function MasterProfileForm({ initialData }: Props) {
  const router = useRouter();

  const [visi, setVisi] = useState(initialData?.Visi || "");
  const [misi, setMisi] = useState(initialData?.Misi || "");
  const [profileText, setProfileText] = useState(
    initialData?.Profile_text || ""
  );
  const [tentangText, setTentangText] = useState(
    initialData?.Tentang_text || ""
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/admin/profil`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Visi: visi,
          Misi: misi,
          Profile_text: profileText,
          Tentang_text: tentangText,
        }),
      });

      if (!res.ok) throw new Error();

      router.refresh();
      alert("Data berhasil disimpan");
    } catch (error) {
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">

      {/* PROFILE */}
      <div className="space-y-2">
        <label className="font-semibold">Profile Kantor</label>
        <textarea
          value={profileText}
          onChange={(e) => setProfileText(e.target.value)}
          className="w-full min-h-[200px] border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* TENTANG */}
      <div className="space-y-2">
        <label className="font-semibold">Tentang Kantor</label>
        <textarea
          value={tentangText}
          onChange={(e) => setTentangText(e.target.value)}
          className="w-full min-h-[200px] border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* VISI */}
      <div className="space-y-2">
        <label className="font-semibold">Visi</label>
        <textarea
          value={visi}
          onChange={(e) => setVisi(e.target.value)}
          className="w-full min-h-[150px] border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* MISI */}
      <div className="space-y-2">
        <label className="font-semibold">Misi</label>
        <textarea
          value={misi}
          onChange={(e) => setMisi(e.target.value)}
          className="w-full min-h-[150px] border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* BUTTON */}
      <div className="pt-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary text-white px-6 py-2 rounded-md hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Semua"}
        </button>
      </div>
    </div>
  );
}