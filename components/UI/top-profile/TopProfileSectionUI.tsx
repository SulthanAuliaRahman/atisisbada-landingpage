"use client";

import React from "react";
import {
  Building2,
  LineChart,
  Lightbulb,
  Users,
} from "lucide-react";

const navItems = [
  {icon: Building2,label: "Tentang Perusahaan & Aplikasi",target: "tentang"},
  {icon: LineChart,label: "Perkembangan",target: "perkembangan"},
  {icon: Lightbulb,label: "Visi dan Misi",target: "visi-misi"},
  {icon: Users,label: "Bertemu dengan Pengembang",target: "pengembang"},
];

interface Props {
  profile_text: string;
}

const TopProfileSectionUI = ({profile_text}:Props) => {
  return (
    <section className="relative w-full
    ">
      {/* HERO */}
      <div className="relative h-[450px] md:h-[550px] w-full">
        {/* Background */}
        <img
          src="/carousel/4_keunggulan_atisisbada.png"
          alt="Profile Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Profil
          </h1>

          <div className="mt-4 flex gap-2">
            <span className="w-6 h-[3px] bg-secondary rounded-full" />
            <span className="w-6 h-[3px] bg-secondary rounded-full" />
            <span className="w-6 h-[3px] bg-secondary rounded-full" />
          </div>

          <p className="mt-6 max-w-xl text-sm md:text-base text-white/80">
            {profile_text}
          </p>
        </div>

        {/* FLOATING NAV CARD */}
        <div className="absolute -bottom-20 left-0 w-full z-30 px-6 hidden lg:block">
          <div className="container">
            <div className="bg-card border border-card-border shadow-2xl rounded-2xl px-6 py-6 md:py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      onClick={() => handleScroll(item.target)}
                      className="flex flex-col items-center gap-3 cursor-pointer group"
                    >
                      <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <Icon size={26} />
                      </div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopProfileSectionUI;

const handleScroll = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};