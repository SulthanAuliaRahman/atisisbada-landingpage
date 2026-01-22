type Props = {
  message: string | null;
};

export default function AlertMessage({ message }: Props) {
  if (!message) return null;

  const isSuccess = message === "Data berhasil disimpan";

  return (
    <div
      className={`p-3 rounded text-sm mb-4 ${
        isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {message}
    </div>
  );
}
