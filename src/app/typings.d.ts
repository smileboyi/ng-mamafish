declare module screenfull {
  export const isEnabled: boolean;
  export const toggle: () => any;
}

declare module 'quill' {
  type QuillType = any;
  type Delta = any;
}

type QuillType = any;
type Delta = any;

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
