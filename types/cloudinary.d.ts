// types/cloudinary.d.ts
declare module "cloudinary" {
    export namespace v2 {
      interface ConfigOptions {
        cloud_name?: string;
        api_key?: string;
        api_secret?: string;
        secure?: boolean;
      }
      function config(options: ConfigOptions): void;
  
      // 使うメソッドだけ追加
      function uploader(): any; 
      // ↑本来は細かい型定義が必要ですが、必要に応じて定義を拡張してください
    }
  }
  