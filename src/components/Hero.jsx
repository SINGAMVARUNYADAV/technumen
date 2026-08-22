import React from 'react';

export default function Hero() {
  return (
    <>
      <section className="relative h-[150px] sm:h-[185px] flex items-center overflow-hidden bg-[#12244f]">
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,21,61,.86),rgba(17,46,112,.44)),url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center" />
        <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">Careers</h1>
        </div>
      </div>
      <div className="bg-[#f3f3f3] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between opacity-80">
          <span className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[10px] font-bold text-[#193b73]">CMMI <span className="text-[#008080]">APPRAISED</span></span>
          <span className="rounded-full border-2 border-[#65a8d5] bg-white px-3 py-2 text-[10px] font-black text-[#173a66]">SOC 2<br/><span className="text-[8px]">TYPE 2</span></span>
          <span className="hidden sm:inline rounded border border-gray-200 bg-white px-3 py-2 text-[10px] font-semibold text-[#193b73]">ISO 9001:2015<br/><span className="font-normal">CERTIFIED</span></span>
        </div>
      </div>
    </>
  );
}
