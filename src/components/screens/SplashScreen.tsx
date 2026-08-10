"use client";

import React, { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";

interface SplashScreenProps {
  onComplete: () => void;
}

// 4 leaf petal paths extracted from the official emblem SVG
const PETAL_PATHS = {
  topLeft:
    "M9.28422 1.10884L8.93681 1.14602L8.60795 1.20966L8.28314 1.29608L7.97315 1.41197L7.6672 1.54829L7.38686 1.70337L7.12135 1.90166L6.8737 2.09794L6.65366 2.32068L6.44442 2.56687L6.27359 2.82411L6.11759 3.10581L5.99225 3.41396L5.90835 3.74656L5.84096 4.07715L5.82613 4.4456L5.83691 4.81404L5.84096 4.94065V5.19253L5.83691 5.31311L5.81333 5.42699L5.78974 5.5449L5.76716 5.65476L5.73751 5.74989L5.70011 5.84501L5.65664 5.94014L5.6179 6.02991L5.5714 6.13039L5.51917 6.20876L5.54629 6.28446L5.39551 6.35715L5.34328 6.43452L5.26613 6.48744L5.19301 6.55443L5.11787 6.6174L5.037 6.65759L4.94603 6.70951L4.85808 6.75171L4.757 6.79593L4.65827 6.82641L4.56259 6.85086L4.4551 6.87833L4.33649 6.90981L4.22395 6.91751L4.09861 6.93225L3.9763 6.94297L3.84893 6.93225L3.71416 6.91751L3.34351 6.91048L2.98703 6.94398L2.63862 6.99389L2.31482 7.08432L2.01763 7.20892L1.73224 7.36601L1.4647 7.54153L1.21806 7.7445L0.992979 7.95954L0.798561 8.20773L0.614926 8.47269L0.457909 8.75537L0.315718 9.0625L0.197114 9.37471L0.106138 9.70159L0.0464985 10.0158L0.0178582 10.3712L0 10.7192L0.0178582 11.0782L0.0464985 11.4343L0.107823 11.7897L0.208906 12.1488L0.330207 12.5041L0.488235 12.8515L0.669848 13.1938L0.881114 13.5254L1.12978 13.8603L1.39934 14.1655L1.71842 14.4706L2.05807 14.7533L2.42331 15.0212L2.83304 15.2607L3.18953 15.453L3.55781 15.6111L3.93182 15.7337L4.32571 15.8553L4.72163 15.9464L5.13236 16.0237L5.54512 16.0874L5.97439 16.1235L6.41073 16.1628L6.83899 16.1842L7.27702 16.1919H7.71504L8.15307 16.1842L8.60424 16.1675L9.05337 16.1487L9.48771 16.1233L10.3594 16.082L11.2203 16.0449L11.6408 16.0321L12.0546 16.0251H12.4562L12.848 16.0321L13.2312 16.0488L13.6018 16.084L13.961 16.1155L14.3054 16.1862L14.6353 16.2498L14.9483 16.3503L15.2434 16.4642L15.5227 16.5918L15.3846 16.3172L15.2751 16.0248L15.1815 15.7146L15.0996 15.383L15.0473 15.048L14.9999 14.683L14.9722 14.3145L14.9594 13.927L14.9486 13.5385V13.1365L14.9574 12.7288L14.9594 12.3078L14.9978 11.4484L15.05 10.5798L15.071 10.1333L15.0935 9.68989L15.0975 9.24538L15.1133 8.80763V8.35746L15.0975 7.92672L15.0847 7.48793L15.0511 7.05719L14.9988 6.64118L14.9476 6.22819L14.8714 5.81419L14.7777 5.41962L14.6592 5.01768L14.5318 4.63685L14.366 4.27276L14.1773 3.9194L13.9395 3.5131L13.678 3.14935L13.3906 2.79765L13.0775 2.49921L12.7743 2.22556L12.4444 1.98205L12.1074 1.76333L11.7658 1.58279L11.4224 1.43642L11.0572 1.30981L10.7068 1.20933L10.3503 1.13966L9.98505 1.10616L9.63459 1.0874L9.28422 1.10884Z",

  topRight:
    "M21.0392 1.10884L20.6811 1.14234L20.3208 1.211L19.9643 1.31148L19.6062 1.4381L19.2656 1.58446L18.9249 1.765L18.5805 1.98372L18.2578 2.22723L17.941 2.50089L17.6428 2.79933L17.3527 3.14935L17.0923 3.51343L16.8436 3.91973L16.6542 4.2731L16.4982 4.63718L16.3634 5.01803L16.256 5.41996L16.1505 5.81454L16.0814 6.22853L16.0251 6.64152L15.976 7.05753L15.9376 7.48827L15.9298 7.92705L15.9247 8.35779V8.80629L15.9298 9.24403L15.9376 9.68854L15.9584 10.1321L15.9763 10.5785L16.0255 11.4471L16.0669 12.3065L16.0777 12.7288L16.0827 13.1382V13.5401L16.0777 13.9286L16.0599 14.3162L16.0292 14.6846L15.9867 15.0498L15.9305 15.3846L15.8506 15.7163L15.7657 16.0264L15.6454 16.3188L15.5218 16.5935L15.7876 16.4659L16.0827 16.352L16.3948 16.2515L16.7216 16.1879L17.0653 16.1172L17.436 16.0857L17.7952 16.0505L18.1772 16.0338L18.5701 16.0268H18.9768L19.3775 16.0338L19.804 16.0465L20.6588 16.0857L21.5402 16.127L21.9817 16.1523L22.4248 16.1712L22.8688 16.1879L23.314 16.1956H23.758L24.1893 16.1879L24.6236 16.1665L25.057 16.1272L25.4825 16.091L25.899 16.0274L26.3077 15.9501L26.7026 15.8589L27.0976 15.7373L27.4756 15.6148L27.8462 15.4567L28.1966 15.2644L28.6131 15.0249L28.9723 14.757L29.3177 14.4743L29.6337 14.1681L29.8941 13.863L30.1459 13.528L30.3592 13.1965L30.5428 12.8541L30.6938 12.5068L30.8161 12.1514L30.9199 11.7924L30.9802 11.437L31.0246 11.0809L31.0347 10.7192L31.0138 10.3728L30.9802 10.0185L30.9199 9.7006L30.8241 9.37372L30.7116 9.06151L30.5735 8.75438L30.4154 8.47168L30.2426 8.20674L30.0343 7.95853L29.7985 7.7435L29.5535 7.54052L29.2968 7.36501L29.0026 7.20792L28.7085 7.08332L28.3847 6.99288L28.0393 6.94297L27.6889 6.90947L27.3098 6.91651L27.1834 6.93125L27.053 6.94197L26.9267 6.93125L26.8054 6.91651L26.6851 6.90881L26.5726 6.87732L26.4677 6.84986L26.3667 6.82541L26.2679 6.79492L26.1702 6.75072L26.0843 6.70851L25.9887 6.65659L25.9097 6.6164L25.8377 6.55343L25.7588 6.48644L25.6898 6.43352L25.6295 6.35615L25.5681 6.28346L25.5119 6.20776L25.4535 6.12938L25.4057 6.02991L25.3693 5.94148L25.3339 5.84635L25.2976 5.75123L25.2639 5.6561L25.2413 5.54624L25.2234 5.42834L25.1978 5.31445L25.1928 5.19387V4.94165L25.1978 4.81504L25.2126 4.4466L25.184 4.07816L25.1287 3.74756L25.0321 3.41496L24.9144 3.1068L24.7635 2.82511L24.5788 2.56788L24.3854 2.32169L24.1526 2.09895L23.9137 1.90267L23.6442 1.70438L23.3598 1.5493L23.0566 1.41297L22.7438 1.29608L22.4251 1.20966L22.0905 1.14602L21.7489 1.10884L21.3961 1.09008L21.0392 1.10884Z",

  bottomLeft:
    "M15.2411 16.7238L14.9459 16.8407L14.6329 16.9369L14.303 17.0038L13.9586 17.0597L13.5995 17.1107L13.2288 17.1371L12.8457 17.1559L12.4538 17.1737L12.0522 17.1559L11.6384 17.1529L11.2203 17.1451L10.3604 17.1089L9.48843 17.0597L9.05409 17.039L8.60492 17.0135L8.15409 17.0048L7.71606 16.9978H7.27803L6.84 17.0048L6.41174 17.0196L5.9754 17.0597L5.54612 17.1087L5.13337 17.1569L4.72263 17.2413L4.32672 17.3384L3.93283 17.4483L3.55883 17.5779L3.19054 17.734L2.83406 17.9216L2.42432 18.1727L2.05907 18.4317L1.71842 18.7244L1.40069 19.0159L1.13113 19.328L0.882461 19.6606L0.671196 19.9956L0.489582 20.3429L0.32987 20.6855L0.208232 21.039L0.107149 21.3923L0.0464985 21.7561L0.0178582 22.1211L0 22.4715L0.0178582 22.8149L0.0464985 23.1632L0.107823 23.4938L0.198798 23.8207L0.317403 24.1308L0.459594 24.4323L0.616611 24.715L0.800246 24.9779L0.994662 25.2205L1.21974 25.4502L1.46639 25.6542L1.73392 25.8308L2.01931 25.9751L2.3165 26.1037L2.6403 26.1948L2.98871 26.2458L3.3452 26.2701L3.71584 26.2625L3.85061 26.2547H4.10029L4.22564 26.2625L4.33818 26.2802L4.45678 26.3107L4.56427 26.3265L4.65996 26.36L4.75869 26.3884L4.85977 26.4383L4.94771 26.4855L5.03869 26.5267L5.11955 26.5806L5.19469 26.6376L5.26781 26.6956L5.34497 26.7485L5.3972 26.8279L5.46458 26.8985L5.52085 26.9752L5.57309 27.0576L5.61958 27.1471L5.65799 27.2335L5.70146 27.3403L5.73886 27.4374L5.76851 27.5269L5.79109 27.6368L5.81468 27.7487L5.83825 27.8702L5.84231 27.9928V28.243L5.83825 28.3736L5.82747 28.7524L5.84231 29.1028L5.90969 29.4522L5.9936 29.766L6.11894 30.0644L6.27494 30.3539L6.44577 30.6178L6.65501 30.864L6.87505 31.0985L7.1227 31.2938L7.38821 31.4783L7.66855 31.6374L7.9745 31.7714L8.28448 31.892L8.6093 31.9677L8.93816 32.0346L9.28557 32.0798L9.63594 32.0916L9.9864 32.0798L10.3516 32.0463L10.7092 31.968L11.0596 31.8775L11.4248 31.7656L11.7685 31.6056L12.1101 31.4173L12.4471 31.2123L12.7769 30.9672L13.0802 30.6814L13.3933 30.382L13.6806 30.0471L13.9411 29.6652L14.1791 29.2549L14.3677 28.9116L14.5335 28.5407L14.6608 28.1619L14.7794 27.7674L14.8731 27.3691L14.9493 26.9716L15.0005 26.5485L15.0527 26.1255L15.0864 25.69L15.0992 25.2643L15.1151 24.8238V24.3851L15.0992 23.9436L15.0952 23.4951L15.0726 23.0614L15.0517 22.6178L14.9995 21.7503L14.9604 20.8886L14.9584 20.4618L14.9476 20.0626V19.6482L14.9584 19.2617L14.9711 18.8702L14.9988 18.5101L15.0463 18.146L15.0986 17.811L15.1804 17.4734L15.2741 17.1585L15.3836 16.8702L15.5218 16.5935L15.2411 16.7238Z",

  bottomRight:
    "M15.6454 16.8682L15.7657 17.1566L15.8506 17.4714L15.9305 17.801L15.9867 18.1453L16.0292 18.5094L16.0599 18.8694L16.0777 19.261L16.0827 19.6476V20.0616L16.0777 20.4608L16.068 20.8875L16.0265 21.748L15.9773 22.6155L15.9594 23.059L15.9376 23.4941L15.9298 23.9426L15.9258 24.3851V24.8248L15.9308 25.2653L15.9376 25.6913L15.976 26.1268L16.0251 26.5499L16.0814 26.9729L16.1505 27.3705L16.256 27.7687L16.3634 28.1633L16.4982 28.5421L16.6542 28.9129L16.8436 29.2562L17.0933 29.6666L17.3527 30.0457L17.6408 30.3806L17.939 30.6801L18.2557 30.9658L18.5785 31.211L18.9229 31.416L19.2635 31.6043L19.6042 31.7644L19.9624 31.8762L20.3189 31.9666L20.679 32.045L21.0372 32.0785L21.3947 32.0903L21.7472 32.0785L22.0888 32.0333L22.4234 31.9663L22.7422 31.8906L23.0531 31.77L23.3564 31.636L23.6408 31.4769L23.9104 31.2924L24.1493 31.0971L24.3821 30.8627L24.5755 30.6164L24.7601 30.3525L24.9111 30.0631L25.0286 29.7647L25.1254 29.4508L25.1807 29.1014L25.2093 28.7512L25.1944 28.3723L25.1894 28.2417V27.9915L25.1944 27.8689L25.2201 27.7473L25.2379 27.6354L25.2605 27.5255L25.2941 27.4361L25.3306 27.339L25.366 27.2321L25.4023 27.1458L25.4535 27.0563L25.5119 26.9739L25.5681 26.8972L25.6295 26.8265L25.6898 26.7471L25.7588 26.6942L25.8377 26.6363L25.9097 26.5793L25.9887 26.5254L26.0843 26.4842L26.1702 26.437L26.2679 26.387L26.3667 26.3586L26.4677 26.3251L26.5726 26.3094L26.8054 26.2611L26.9267 26.2534H27.1834L27.3098 26.2611L27.6889 26.2688L28.0393 26.2444L28.3847 26.1935L28.7085 26.1024L29.0026 25.9738L29.2968 25.8294L29.5535 25.6528L29.7985 25.4489L30.0343 25.2191L30.2426 24.9766L30.4154 24.7137L30.5735 24.431L30.7116 24.1295L30.8241 23.8193L30.9199 23.4925L30.9802 23.1618L31.0138 22.8135L31.0347 22.4702L31.024 22.1198L30.9794 21.7547L30.9191 21.3906L30.8154 21.0373L30.6931 20.6839L30.5421 20.3406L30.3588 19.9946L30.1455 19.6596L29.8939 19.3274L29.6334 19.0152L29.3173 18.7238L28.972 18.4303L28.6128 18.1715L28.1963 17.9202L27.8459 17.7326L27.4752 17.5766L27.0972 17.447L26.7023 17.3371L26.3074 17.24L25.8987 17.1556L25.4822 17.1073L25.0566 17.0585L24.6233 17.0182L24.189 17.0035L23.7577 16.9964H23.3143L22.8692 17.0035L22.4251 17.0122L21.982 17.0377L21.5406 17.0585L20.6591 17.1073L19.8043 17.1435L19.3777 17.1522L18.9771 17.1552L18.5704 17.1729L18.1776 17.1552L17.7954 17.1365L17.4362 17.11L17.0656 17.0591L16.7219 17.0031L16.3951 16.9362L16.0831 16.84L15.7879 16.7231L15.5214 16.5891L15.6454 16.8682Z",
};

// SSR-safe layout effect to execute synchronously before initial paint
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const emblemGroupRef = useRef<HTMLDivElement>(null);

  const petalTLRef = useRef<HTMLDivElement>(null);
  const petalTRRef = useRef<HTMLDivElement>(null);
  const petalBLRef = useRef<HTMLDivElement>(null);
  const petalBRRef = useRef<HTMLDivElement>(null);

  const nameRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete,
      });

      // 1. Position 4 HTML petal wrappers right at outer viewport edges for instantaneous flow on load
      gsap.set(petalTLRef.current, {
        x: "-38vw",
        y: "-38vh",
        opacity: 1,
        scale: 0.4,
        rotation: -270,
        transformOrigin: "center center",
      });
      gsap.set(petalTRRef.current, {
        x: "38vw",
        y: "-38vh",
        opacity: 1,
        scale: 0.4,
        rotation: 270,
        transformOrigin: "center center",
      });
      gsap.set(petalBLRef.current, {
        x: "-38vw",
        y: "38vh",
        opacity: 1,
        scale: 0.4,
        rotation: -210,
        transformOrigin: "center center",
      });
      gsap.set(petalBRRef.current, {
        x: "38vw",
        y: "38vh",
        opacity: 1,
        scale: 0.4,
        rotation: 210,
        transformOrigin: "center center",
      });

      gsap.set(nameRef.current, { y: 20, opacity: 0 });

      // 2. Leafy Windy S-Curve Flow (Starts INSTANTLY on load at 0.0s)
      // Top Left Petal: Swirling down-right, dipping, then swooping into center
      tl.to(
        petalTLRef.current,
        {
          keyframes: [
            { x: "-38vw", y: "-38vh", rotation: -270, scale: 0.4, opacity: 1, duration: 0 },
            { x: "-20vw", y: "-10vh", rotation: -160, scale: 0.65, opacity: 1, duration: 0.55, ease: "sine.inOut" },
            { x: "-8vw", y: "8vh", rotation: -70, scale: 0.88, opacity: 1, duration: 0.55, ease: "sine.inOut" },
            { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
          ],
        },
        0
      );

      // Top Right Petal: Swirling down-left, dipping, then swooping into center
      tl.to(
        petalTRRef.current,
        {
          keyframes: [
            { x: "38vw", y: "-38vh", rotation: 270, scale: 0.4, opacity: 1, duration: 0 },
            { x: "20vw", y: "-12vh", rotation: 160, scale: 0.65, opacity: 1, duration: 0.55, ease: "sine.inOut" },
            { x: "6vw", y: "10vh", rotation: 70, scale: 0.88, opacity: 1, duration: 0.55, ease: "sine.inOut" },
            { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
          ],
        },
        0.04
      );

      // Bottom Left Petal: Lofting up-right, looping slightly, then swooping into center
      tl.to(
        petalBLRef.current,
        {
          keyframes: [
            { x: "-38vw", y: "38vh", rotation: -210, scale: 0.4, opacity: 1, duration: 0 },
            { x: "-22vw", y: "12vh", rotation: -130, scale: 0.65, opacity: 1, duration: 0.55, ease: "sine.inOut" },
            { x: "-8vw", y: "-8vh", rotation: -50, scale: 0.88, opacity: 1, duration: 0.55, ease: "sine.inOut" },
            { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
          ],
        },
        0.08
      );

      // Bottom Right Petal: Lofting up-left, looping slightly, then swooping into center
      tl.to(
        petalBRRef.current,
        {
          keyframes: [
            { x: "38vw", y: "38vh", rotation: 210, scale: 0.4, opacity: 1, duration: 0 },
            { x: "22vw", y: "14vh", rotation: 130, scale: 0.65, opacity: 1, duration: 0.55, ease: "sine.inOut" },
            { x: "6vw", y: "-6vh", rotation: 50, scale: 0.88, opacity: 1, duration: 0.55, ease: "sine.inOut" },
            { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
          ],
        },
        0.12
      );

      // 3. Subtle emblem locking motion when petals merge
      tl.to(
        emblemGroupRef.current,
        {
          scale: 1.06,
          duration: 0.22,
          ease: "power1.out",
        },
        "-=0.2"
      );

      tl.to(emblemGroupRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });

      // 4. Reveal brand name in slate gray font color
      tl.to(
        nameRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
        },
        "-=0.25"
      );

      // 5. Brief minimal hold
      tl.to({}, { duration: 0.75 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 select-none w-full h-full overflow-hidden"
    >
      {/* Main Center Branding - Pure Flat Logo & Gray Name */}
      <div className="flex flex-col items-center justify-center text-center z-10">
        {/* Animated 4-Petal Emblem Container */}
        <div ref={emblemGroupRef} className="relative w-24 h-24 mb-6 flex items-center justify-center">
          {/* Top Left Leaf Petal Wrapper */}
          <div
            ref={petalTLRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: 0 }}
          >
            <svg viewBox="0 0 32 33" fill="none" className="w-full h-full">
              <path d={PETAL_PATHS.topLeft} fill="#1E7240" />
            </svg>
          </div>

          {/* Top Right Leaf Petal Wrapper */}
          <div
            ref={petalTRRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: 0 }}
          >
            <svg viewBox="0 0 32 33" fill="none" className="w-full h-full">
              <path d={PETAL_PATHS.topRight} fill="#1E7240" />
            </svg>
          </div>

          {/* Bottom Left Leaf Petal Wrapper */}
          <div
            ref={petalBLRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: 0 }}
          >
            <svg viewBox="0 0 32 33" fill="none" className="w-full h-full">
              <path d={PETAL_PATHS.bottomLeft} fill="#1E7240" />
            </svg>
          </div>

          {/* Bottom Right Leaf Petal Wrapper */}
          <div
            ref={petalBRRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: 0 }}
          >
            <svg viewBox="0 0 32 33" fill="none" className="w-full h-full">
              <path d={PETAL_PATHS.bottomRight} fill="#1E7240" />
            </svg>
          </div>
        </div>

        {/* Minimal Gray Brand Name */}
        <div ref={nameRef} style={{ opacity: 0 }} className="space-y-1.5">
          <h1 className="text-3xl font-extrabold text-slate-700 tracking-tight font-sans">
            Religare
          </h1>
          <p className="text-[12px] font-semibold text-slate-500 tracking-widest uppercase">
            Broking &amp; Wealth
          </p>
        </div>
      </div>
    </div>
  );
}


