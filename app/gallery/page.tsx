"use client";

import Image from "next/image";

export default function Gallery() {
  const items = [
    {
      title: "Ghanaian Art",
      description: "A curated collection of contemporary and traditional art.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDdnPCiYZotuXsN9taM1m4ERqeDId3dMX9tBJNqkhuCYupZoouAnOees9oimsA7YohP8q8ZzUA2rkK__T9krnF5wkMMSvzitNOZukawwn22sk0G9c3-Sm8nMqp9RKmCNSaeIdbHePIoKnBFJ8ejfev2B3b4fmtAt_CHs_Vo8h8NoopGfDArRHld3MruDO1oh_nLOYr5jSmfmxpRV8iFPtbwYeuuUIKVdoEzCemsZa19XHsgzWc7_zrGsF6xZmNXmG97WTdqkRBixRY",
    },
    {
      title: "Cultural Heritage",
      description: "Celebrating the rich history and symbols of Ghana.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBU7E4JtOXvL9VCRn-Y0cI7ZUB9HjUuWXJnFUgf0SNe-iuDMJgPwzMZHSpwYsgAWpzVGGYO59uHqFhRPId2El2w2mWUVWLSf9Kh0NzbqAaAlTqULgbr5Q_KNuv8Tx7qHrxpg_u2m_cVG0RvHQnWIvwqw6aIAEjdt5a69Jh57zeBYLKssYypX2A0Cx8O-A1Jj2mlb1-OL3-Ax-ntptx9Q73jqLJO1cZrp-pkD19BshPmpgmWMoh8IgeDayOknVvNfkHYPyE3pPdwc9k",
    },
    {
      title: "Modern Designs",
      description: "Innovative designs inspired by Ghanaian aesthetics.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDFrlTkA9b5JyfS1zhuB_8OI2WnoaX4xyNOKAX3D-HWgAJ33YaSDQoGgSJ0lS3JcBzsOwZsboX8YGyFSNA39D5HcK6ELiN-kiy5c8hquGW9mY_mUknAzl_6VAZm2l1OVtOcQktC4QS2K3TgonHl1YXexfwR07F3dDoI4qTwdT0WKNOftfuF8hc4WWPzobgoKuNb2I2RWV57SZI1dM9TQNFhtoQKFbpAQlKNdQZkHzSwh0B_6KWFOAifs-NGbvKFnCvKa8Sg8DHBQJw",
    },
    {
      title: "Traditional Crafts",
      description: "Mastery of age-old techniques in crafts and textiles.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAClESVRbVuQ3UGDm59UnIkpX2twzcJ96Bi_xeBI5D9DrkkZD3m4wj3H_nzPLaqT9m1wJvocWAHt7wOE_La3f7vwvKSQu0gVvsHta3PjRHgJw1VxqgJNA8zfLS7unL-8QPA4ZlrxkgRM-R-amsv3RJoOe6xbCOfYaDDF83VKrDzVU_RgVSBZFCRUCFFDuJ0bTuC6NnVkaABAx7F2Tu5iymExUPeKB57rLQpKfy6HwVtumXlsw_RjvijI5ZC0QxeUX9rjHOLoi7_Vf8",
    },
  ];

  return (
    <main className="flex-grow bg-background-light dark:bg-background-dark font-display">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-background-dark dark:text-background-light">
            GALLERY
          </h2>
          <p className="mt-4 text-lg text-background-dark/70 dark:text-background-light/70 max-w-2xl mx-auto">
            Exploring the vibrant fusion of tradition and modernity in Ghanaian
            design.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Wrapper enforces 5:4 aspect ratio */}
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="absolute bottom-0 left-0 p-6">
                <div className="inline-block rounded-md bg-black/60 sm:bg-black/50 md:bg-black/40 px-4 py-3 backdrop-blur-[2px]">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-white/80 mt-1">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
