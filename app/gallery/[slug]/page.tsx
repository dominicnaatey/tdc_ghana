"use client";

import Image from "next/image";

export default function GalleryPage() {
  const galleryImages = [
    {
      alt: "Group of people in a meeting",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKKSbZy5wAFaU_DSVg11-6qO1CT7uIusVLv12p09ZqAvkK35Rex8SzXotbik5kEaSLCGVTrwXD1HkpWq7yN_xnUrsSoAWgJ7ooX5wE-RkLWckhC36ZsDADRbWH5yVoTOL5xzqLBwzmavHCH78nsRvD3dnx--q6J8OGaieO3g7193ipIT9dud2U4kZVSOkiJ2jnSLlB_41uqn_4M6nI72RTelSfOe5ZhOXke9xHUGVVw8Rn3-vCTJk_dOFyX_xiiE80RibVp16_egzR",
    },
    {
      alt: "Another group of people in a meeting",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuADD64vds7Ux7IJVom9Qyt7HY-qZjBCaoBnLG7D8gtiatENFXXyYHWNGxtm7LC0aMSmp32CKZfFC6aSNOStRNB009wZqgAWGY_UinYPZ1XHgItsSJ7cBEBuVDE3M6f2c6iZqaMPUr7EYNzvU6R3pRVTge-WHJRs7rpYnJPnJu50sap9De4xI-VWllp_YQXnGvXxpKNH8d_LpzZ3d5h93IJ3d5t6k_-cwuDmTpf5fIZn8vwhTGt4o-NJ9tp3rQ2Z08eRt_4OZxK0lueo",
    },
    {
      alt: "Third group of people in a meeting",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCavEoWlIAIve--1d3HrIzXHzgM6TtcIFqNETegkidSMPmcquPMhBJTBtbXOP7AeGo6wtmyBAosJSjpXbWUsTKCWSD9wKj4DVbCCy2dJhtkzdiGJaapwg6b-1MhmRLrl1SpghZT-1iyFsm54qAel5AwcAlrXrLUIfsl2x6tA6XmIWHeZC5IP6BaCCSDtqzkCbDzIlxacBM4ko5h0rYyhQo7KKCoOxfg_oZeTcHKE21KeyuxxjUesZaWDDN5h9uStjx3eZ2wrGVyKCkS",
    },
    {
      alt: "Man at a desk with a flag behind him",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfvBlQvK6I758Mn2btHqbFHP0RAbbyAMgtL4ScmcMJ4u5OoBxAMChAGiee9uY4xGjSkWAkS_5T440isZatR0j84UC3CV2vIXnqgrc32tHVBs_labSSedGsivD1L4wkvUlXfHDV6VQj-jZXrOPYc_QBhXVO8S_zeZKx1beYv6VaA2f2OWo2g6RX0pPQU-Sw1m5KNWNGs7r7HxpgvSUY-m4RZeHlrroOSozbcBmVzkHFFVA41Ol8lgRuxTSN7XEqy5SI8c1ZKmMdx5gX",
    },
    {
      alt: "Two people looking at a laptop",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlvfCEfMksBGPiWauPoHGSM9TeQ0LyfkxDYWZR0A8ln39AycJFyN8TwrRw5-AHfFfz4J_0FkB7t0MZKbflPWmXg5Ee4F2VmF00Pa2fwc34iz2U8uoBhEtEsWRXgCAmpPvxh86tmdwv-yqaasjgFxv85HWOLSd9dqcAmG7jjUqj0u22X93WWJA8kKoAVcYnzaSjkvE7PTKap2KHZY47v0_pajOAsGBj2G5c5JeT_a4iNzYo72zGtT18blV29aKlx1ja5ARHnP25JnQv",
    },
    {
      alt: "Wider view of the meeting room",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAx9KIbhQ3Ve6OUIvX_PxjbjVFEycx-lECuStH2kjSKavmQ9n-QC280SKtirC3Z26iExyjAWYWU8Y9ZZIp2-mvpmb5B8rxHP6Qu9mLijSm2udrcym1qvdgmw3zOkNI23ntHAng1HW78b_vbNzDzcbqPrQ5aODtha41-kJfHxNrc__cpltFVuXeea8tvG-HX7YU9DRMy5n8uB1sQr17SJWQ75gFL07TiF6T7EMwTVnpj35E3p9O9xYAFhtyqvgl3W9r7nWaS9cbG_pA",
    },
  ];

  return (
    <main className="bg-background-light dark:bg-background-dark font-display min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative rounded-lg overflow-hidden mb-8 h-[35vh]">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwnu5W_FbjsvMhS-PrghJMY6UoYOrRMtcqzBwCYMjrye5zhzFmMZI9yb_SgCiL5QoINT6c7jy4SEz2u-ekcxsGq5Zn9NsLlSjEhjVYSAD0Mswba7otKNVW1lbzV-zozqFV36pafmPJcL6CRpM3n4jJEA_kuJke9-ipV9lXxK4TXCDKNx4HZVjRNyTkBaKtMb8ZhU4D4XSJ9qwvAFqk2i77zrm4mg2JP2DwzwBbql8YQuVn8o0iMZuzMJWFJRGxU-fZIWz11nSQQzBe"
            alt="People in a meeting room"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-white text-3xl font-bold text-center px-4">
              Ministry of Works, Housing and Water Resources Guides TDC Ghana
              Ltd. on 2025 Budget Preparation
            </h1>
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-center items-center my-8">
          <div className="w-1/3 border-t border-gray-300 dark:border-gray-600" />
          <span className="px-4 text-gray-500 dark:text-gray-400">♦</span>
          <div className="w-1/3 border-t border-gray-300 dark:border-gray-600" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((img, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <div className="relative aspect-[5/4] w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}