"use client";

import React from "react";
import { Sidebar } from "@/components/platform/Sidebar";
import { TopBar } from "@/components/platform/TopBar";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-void text-ink font-sans flex flex-col relative overflow-x-hidden">
      {/* Background Subtle Cyber Grid & Ambient Radial Lighting */}
      <div className="fixed inset-0 bg-cyber-grid opacity-20 pointer-events-none z-0" />
      <div className="fixed top-0 right-1/4 w-[600px] h-[400px] bg-blue-600/[0.07] rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-1/3 w-[600px] h-[400px] bg-indigo-600/[0.05] rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area (Offset for sidebar) */}
      <div className="flex-1 flex flex-col pl-20 lg:pl-64 transition-all duration-300 relative z-10">
        <TopBar />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
