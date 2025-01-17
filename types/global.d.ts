// 例えば: src/types/global.d.ts
export {}; // 空export
declare global {
  interface Window {
    cosmicSimThree?: {
      init: (canvasId: string) => void;
    };
  }
}
