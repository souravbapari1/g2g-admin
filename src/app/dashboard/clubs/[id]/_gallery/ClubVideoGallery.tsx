import React from "react";

const ClubVideoGallery: React.FC = () => {
  const videoUrls = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    "https://www.youtube.com/embed/tgbNymZ7vqY",
    "https://www.youtube.com/embed/L_jWHffIx5E",
    "https://www.youtube.com/embed/kJQP7kiw5Fk",
    "https://www.youtube.com/embed/2Vv-BfVoq4g",
    "https://www.youtube.com/embed/e-ORhEE9VVg",
    "https://www.youtube.com/embed/IcrbM1l_BoI",
    "https://www.youtube.com/embed/09R8_2nJtjg",
    "https://www.youtube.com/embed/OPf0YbXqDm0",
    "https://www.youtube.com/embed/7wtfhZwyrcc",
    "https://www.youtube.com/embed/MYxAiK6VnXw",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {videoUrls.map((videoUrl, index) => (
        <div key={index} className="relative">
          <iframe
            className="w-full h-64 md:h-56 rounded-lg bg-gray-100 aspect-video"
            src={videoUrl}
            title={`YouTube Video ${index + 1}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default ClubVideoGallery;
