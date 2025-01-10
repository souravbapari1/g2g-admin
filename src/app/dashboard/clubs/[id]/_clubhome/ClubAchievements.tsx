import React from "react";

function ClubAchievements() {
  return (
    <div className="p-5 bg-gray-100 mt-5">
      <h1 className="text-xl font-bold">Club Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 lg:grid-cols-3 gap-5">
        {Array(5)
          .fill(0)
          .map((item, index) => {
            return (
              <div
                key={index}
                className="  p-5 pt-32 bg-cover bg-center relative"
                style={{
                  backgroundColor: "#fff",
                  backgroundImage:
                    "url('https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg')",
                }}
              >
                <div className="relative z-20">
                  <h1 className="text-xl font-bold relative">
                    <span className="text-white relative">
                      The Power Of Achieve More Together
                    </span>
                  </h1>
                  <p className="text-white relative">
                    <span className="text-gray-500 relative">
                      Explore the concept of collaboration and its impact on
                      productivity.
                    </span>
                  </p>
                </div>
                <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-10 bg-gradient-to-b from-transparent to-black"></div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ClubAchievements;
