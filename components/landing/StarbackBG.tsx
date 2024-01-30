import { RefObject, useEffect, useRef } from "react";
import Starback from "starback";

import { useWindowSize } from "@uidotdev/usehooks";
export const StarBG = (props: { aniStage: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { aniStage } = props;
  const { width, height } = useWindowSize();
  useEffect(() => {
    if (canvasRef.current) {
      const starback = new Starback(canvasRef.current, {
        type: "dot",
        quantity: 100,
        direction: 0,
        backgroundColor: ["rgb(20,20,20)"],
        // randomOpacity: [0, 0.3],
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientHeight,
        starColor: [
          "rgb(205,174,110)",
          "#9CB3F0",
          "rgb(126,108,74)",
          "rgb(205,174,110)",
          "rgb(126,108,74)",
        ],
        speed: [-0.25, 0.25],
        showfps: true,
      });

      //   let lastpos = scrollCont.scrollTop;
      //   let lastTime = Date.now();
      //   const onScroll = () => {
      //     const now = Date.now();
      //     const delta = now - lastTime;
      //     lastTime = now;
      //     const pos = scrollCont.scrollTop ?? 0;
      //     const deltaPos = pos - lastpos;
      //     const deltaPosAsPercent = (deltaPos * 8000) / scrollCont.scrollHeight!;
      //     lastpos = pos;
      //     console.log(deltaPosAsPercent);
      //     starback.setSpeedMultiplier(
      //       deltaPosAsPercent / delta < 1
      //         ? deltaPosAsPercent / delta
      //         : (deltaPosAsPercent * 5) / delta
      //     );
      //   };
      const to = setInterval(() => {
        console.log(starback.speedMultiplier);
        if (starback.speedMultiplier < -0.2)
          starback.speedMultiplier -= starback.speedMultiplier / 2;
        else if (starback.speedMultiplier > 1)
          starback.speedMultiplier -= starback.speedMultiplier / 2;
        else if (starback.speedMultiplier < 1) starback.speedMultiplier = 1;
      }, 100);
      //   scrollCont.addEventListener("scroll", onScroll);
      return () => {
        clearInterval(to);
        // scrollCont?.removeEventListener("scroll", onScroll);
      };
    }
  }, [canvasRef.current]);
  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full fixed ${
        aniStage >= 1 ? `opacity-50` : `opacity-0`
      } transition-all duration-[1500ms] delay-700`}
    />
  );
};
