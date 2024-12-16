import { useEffect, useRef, useState } from "hono/jsx";
import throttle from "lodash/throttle";
import { animate } from "motion";

export const CursorDemo = () => {
  const [isAnimate, setIsAnimate] = useState(true);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.addEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseMove = throttle(
    (e: MouseEvent) => {
      setPosition({ x: e.offsetX - 2, y: e.offsetY - 5 });
    },
    140,
    {
      leading: false,
      trailing: true,
    },
  );

  return (
    <div class={"w-full h-72 flex flex-col gap-2"}>
      <div class={"flex h-full"}>
        <div
          ref={ref}
          class={"rounded-sm border border-gray-400 w-full h-full"}
        />
        <div
          class={
            "rounded-sm border border-gray-400 w-full h-full relative overflow-hidden"
          }
        >
          <Cursor x={position.x} y={position.y} isAnimate={isAnimate} />
        </div>
      </div>
      <div class={"flex gap-2"}>
        <input
          id="animation-checkbox"
          type={"checkbox"}
          checked={isAnimate}
          onChange={() => setIsAnimate((prev) => !prev)}
        />
        <label for="animation-checkbox">アニメーション</label>
      </div>
    </div>
  );
};

type Props = {
  x: number;
  y: number;
  isAnimate?: boolean;
};
const Cursor = ({ x, y, isAnimate }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && isAnimate) {
      animate(
        ref.current,
        {
          x: x,
          y: y,
        },
        {
          type: "spring",
          bounce: 0.25,
        },
      );
    }
  });

  return (
    <div
      ref={ref}
      id="cursor"
      style={{
        color: "white",
        borderRadius: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
        overflow: "visible",
        pointerEvents: "none",
        transformOrigin: "top left",
        position: "absolute",
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg width="32" height="44" viewBox="0 0 24 36" fill="none">
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <path
          fill="#3AABFF"
          d="M0.928548 2.18278C0.619075 1.37094 1.42087 0.577818 2.2293 0.896107L14.3863 5.68247C15.2271 6.0135 15.2325 7.20148 14.3947 7.54008L9.85984 9.373C9.61167 9.47331 9.41408 9.66891 9.31127 9.91604L7.43907 14.4165C7.09186 15.2511 5.90335 15.2333 5.58136 14.3886L0.928548 2.18278Z"
        ></path>
      </svg>
    </div>
  );
};
