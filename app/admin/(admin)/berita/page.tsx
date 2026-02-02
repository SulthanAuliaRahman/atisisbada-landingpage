import { Berita } from "@/src/generated/prisma";
import BeritaModal from "./BeritaModal";
import BeritaTable from "./BeritaTable";

export const dynamic = "force-dynamic";
async function getBerita() {
  let baseUrl: string;

  if (process.env.NODE_ENV === "development") { //temporary (karena ini serve component jadi weh harus absloute position)
    baseUrl = "http://localhost:3000";
  }
  else {
    baseUrl = "https://dev-atis-landingpage.atisisbada.id";
  }

  const apiUrl = `${baseUrl}/api/admin/berita`;

  const res = await fetch(apiUrl, {
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    console.error("Failed to fetch berita", {
      status: res.status,
      url: apiUrl,
      response: await res.text().catch(() => "(no body)"),
    });
    throw new Error("Gagal mengambil data berita");
  }

  return res.json();
}

export default async function AdminBeritaPage() {
  const berita = await getBerita();

  const nextOrder =
    berita.length > 0
      ? Math.max(...berita.map((b: Berita) => b.nomor_urut ?? 0)) + 1
      : 1;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-xl font-bold">Manajemen Berita</h1>
        <BeritaModal triggerLabel="Tambah Berita" nextOrder={nextOrder} />
      </div>

      <BeritaTable berita={berita} />
    </div>
  );
}