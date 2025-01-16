// global.d.ts
declare module 'mobile-detect' {
    export default class MobileDetect {
      constructor(userAgent: string)
      phone(): string | null
      tablet(): string | null
      mobile(): string | null
    }
  }
  