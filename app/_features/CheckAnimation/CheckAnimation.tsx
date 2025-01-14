"use client";

import { useEffect, useState } from "react";
import CircleLoader from "../Loaders/CircleLoader";

const CheckAnimation = ({
  size = 40,
  color = "#123524",
  loaderIterationCount = 2,
  durationPerCircle: durationPerCircleNumber = 1,
  message = "Short message Here 🎉",
}) => {
  const designedSize = 60;
  const scale = size / designedSize;
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const durationPerCircle = `${durationPerCircleNumber}s`;
  const millisecs = 1000;
  const loaderLifeSpan = durationPerCircleNumber * loaderIterationCount;
  const checkDelayIndex = (1 - 0.6) * durationPerCircleNumber;
  const checkDelay = loaderLifeSpan - checkDelayIndex;

  useEffect(
    function () {
      setTimeout(() => setShowLoader(false), loaderLifeSpan * millisecs);
      setTimeout(() => setShouldAnimate(true), checkDelay * millisecs);
    },
    [loaderLifeSpan, checkDelay, checkDelayIndex, durationPerCircleNumber]
  );

  return (
    <>
      <div className="relative inline-flex items-center justify-center">
        {showLoader && (
          <span className={`z-10 absolute ${"opacity-100"}`}>
            <CircleLoader
              size={size}
              color={color}
              iterationCount={loaderIterationCount}
              animationDuration={durationPerCircle}
            />
          </span>
        )}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`M${30 * scale} ${2 * scale}C${33.677 * scale} ${2 * scale} ${
              37.318 * scale
            } ${2.72424 * scale} ${40.7151 * scale} ${4.13137 * scale}C${
              44.1123 * scale
            } ${5.53851 * scale} ${47.199 * scale} ${7.60097 * scale} ${
              49.799 * scale
            } ${10.201 * scale}C${52.399 * scale} ${12.8011 * scale} ${
              54.4615 * scale
            } ${15.8878 * scale} ${55.8686 * scale} ${19.2849 * scale}C${
              57.2758 * scale
            } ${22.682 * scale} ${58 * scale} ${26.323 * scale} ${58 * scale} ${
              30 * scale
            }C${58 * scale} ${33.677 * scale} ${57.2758 * scale} ${
              37.318 * scale
            } ${55.8686 * scale} ${40.7151 * scale}C${54.4615 * scale} ${
              44.1123 * scale
            } ${52.399 * scale} ${47.199 * scale} ${49.799 * scale} ${
              49.799 * scale
            }C${47.1989 * scale} ${52.399 * scale} ${44.1122 * scale} ${
              54.4615 * scale
            } ${40.7151 * scale} ${55.8686 * scale}C${37.318 * scale} ${
              57.2758 * scale
            } ${33.677 * scale} ${58 * scale} ${30 * scale} ${58 * scale}C${
              26.323 * scale
            } ${58 * scale} ${22.682 * scale} ${57.2758 * scale} ${
              19.2849 * scale
            } ${55.8686 * scale}C${15.8877 * scale} ${54.4615 * scale} ${
              12.801 * scale
            } ${52.399 * scale} ${10.201 * scale} ${49.799 * scale}C${
              7.60096 * scale
            } ${47.1989 * scale} ${5.5385 * scale} ${44.1122 * scale} ${
              4.13137 * scale
            } ${40.7151 * scale}C${2.72424 * scale} ${37.318 * scale} ${
              2 * scale
            } ${33.677 * scale} ${2 * scale} ${30 * scale}C${2 * scale} ${
              26.323 * scale
            } ${2.72425 * scale} ${22.682 * scale} ${4.13138 * scale} ${
              19.2848 * scale
            }C${5.53851 * scale} ${15.8877 * scale} ${7.60098 * scale} ${
              12.801 * scale
            } ${10.201 * scale} ${10.201 * scale}C${12.8011 * scale} ${
              7.60096 * scale
            } ${15.8878 * scale} ${5.5385 * scale} ${19.2849 * scale} ${
              4.13137 * scale
            }C${22.682 * scale} ${2.72424 * scale} ${26.323 * scale} ${
              2 * scale
            } ${30 * scale} ${2 * scale}Z`}
            stroke={color}
            strokeWidth={4 * scale}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={200 * scale}
            strokeDashoffset={shouldAnimate ? "0" : 200 * scale}
            className="transition-all ease-out"
            style={{
              transitionDuration: durationPerCircle,
            }}
          />
          <path
            d={`M${17.3684 * scale} ${29.579 * scale}L${26.2468 * scale} ${
              38.4211 * scale
            }L${43.1579 * scale} ${21.579 * scale}`}
            stroke={color}
            strokeWidth={4 * scale}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={50 * scale}
            strokeDashoffset={shouldAnimate ? "0" : 50 * scale}
            className="transition-all ease-out relative top-6"
            style={{
              transitionDuration: `${durationPerCircleNumber * 0.3}s`,
              transitionDelay: `${durationPerCircleNumber * 0.5}s`,
            }}
          />
        </svg>
      </div>
      <span
        className={`transition-all ${
          showLoader
            ? "opacity-0 translate-y-[-40%]"
            : "opacity-100 translate-y-0"
        }`}
        style={{
          transitionDelay: `${
            durationPerCircleNumber - checkDelayIndex - 0.5
          }s`,
          transitionDuration: ".5s",
          transitionTimingFunction: "cubic-bezier(.59,.57,.11,1.68)",
        }}
      >
        {message}
      </span>
    </>
  );
};

// style={{
//         animationName: "ping",
//         animationIterationCount: 1,
//         animationDuration: durationPerCircle,
// animationDelay: `${
//   loaderIterationCount * durationPerCircleNumber + checkDelayIndex
// }s`,
//       }}

export default CheckAnimation;
