declare module 'quill' {
  type QuillType = any;
  type Delta = any;
}

type QuillType = any;
type Delta = any;

type StrOrNum = string | number;

declare module 'gitter-sidecar' {
  interface Gitter {
    new (o: any): {
      toggleChat: (b: boolean) => void;
      destroy: () => void;
    };
  }
  const Gitter: Gitter;
  export default Gitter;
}


declare module '@timecat/timecat' {
  interface RecorderModule {}
}