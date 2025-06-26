import React from "react";
import Spline from "@splinetool/react-spline";

export default function RotatingSpline() {
  return (
    <div className="w-full h-screen">
      <Spline
        scene="https://prod.spline.design/8gOAUbN2MhXHnsCb/scene.splinecode"
        onLoad={(splineApp) => {
          console.log(splineApp);  // প্রথমে দেখে নিন object নাম কী কী
          
          const objectToRotate = splineApp.findObjectByName("Cube"); // আপনার object নাম বসান

          const animate = () => {
            if (objectToRotate) {
              objectToRotate.rotation.y += 0.01;
            }
            requestAnimationFrame(animate);
          };

          animate();
        }}
      />
    </div>
  );
}
