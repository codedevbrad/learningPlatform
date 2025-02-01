import React from "react";

const SquaresBackground = () => {
  return (
    <>
      <style>
        {`
          .gradient-bg {
            position: absolute;
            inset: 0;
            background-image: linear-gradient(to right, #8882 1px, transparent 1px),
                              linear-gradient(to bottom, #8882 1px, transparent 1px);
            background-size: 4rem 4rem;
            -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000, transparent);
            mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000, transparent);
            z-index: 0;
          }
          .content {
            position: relative;
            z-index: 1;
            color: black; /* Ensure text is visible */
            text-align: center;
            margin-top: 20%;
            font-size: 1.5rem;
          }
        `}
      </style>
      <div className="relative w-screen h-screen bg-gray-100 overflow-hidden">
        {/* Background Layer */}
        <div className="gradient-bg"></div>

        {/* Content Layer */}
        <div className="content">
          <h1>Your Text Looks Great Now!</h1>
          <p>This is where your page content will go.</p>
        </div>
      </div>
    </>
  );
};

export default SquaresBackground;