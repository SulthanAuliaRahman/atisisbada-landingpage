import { useState, useEffect } from "react";

interface LogoPreviewProps {
  src?: string;
  onFileSelect?: (file: File) => void;
}

export const LogoPreview: React.FC<LogoPreviewProps> = ({
  src,
  onFileSelect,
}) => {
  const [fileSrc, setFileSrc] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLogo() {
      try {
        const logoPath = "/logo.png";
        const img = new Image();
        img.onload = () => {
          setFileSrc(logoPath);
          setLoading(false);
        };
        img.onerror = () => {
          setFileSrc("");
          setLoading(false);
        };
        img.src = logoPath;
      } catch (error) {
        console.error("Failed to check logo:", error);
        setLoading(false);
      }
    }
    checkLogo();
  }, []);

  useEffect(() => {
    if (src) {
      setFileSrc(src);
    }
  }, [src]);

  if (loading) {
    return (
      <div className="h-24 w-32 bg-white/20 rounded flex items-center justify-center text-white text-xs animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <div className="mb-2">
      {fileSrc ? (
        <img
          src={fileSrc}
          alt="Logo"
          className="w-full h-auto object-contain max-h-24"
        />
      ) : (
        <div className="h-24 w-32 bg-white/20 rounded flex items-center justify-center text-white text-xs">
          Logo Preview
        </div>
      )}
    </div>
  );
};
