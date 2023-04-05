declare module "quill" {
  type QuillType = any;
  type Delta = any;
}

type QuillType = any;
type Delta = any;

type StrOrNum = string | number;

declare module "gitter-sidecar" {
  interface Gitter {
    new (o: any): {
      toggleChat: (b: boolean) => void;
      destroy: () => void;
    };
  }
  const Gitter: Gitter;
  export default Gitter;
}

declare module "@timecat/timecat" {
  interface RecorderModule {}
}

type ValueOf<T, U extends keyof T = keyof T> = T[U];

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >;
}[keyof T];

type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
}[keyof T];
