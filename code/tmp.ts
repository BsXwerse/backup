type MyExclude<T, U> = T extends U ? never : T;
type A = "s" | "n" | "q";
type B = "s" | "n";
type C = A extends B ? never : A; // 's' | 'n' | 'q'
type D = MyExclude<A, B>; // 'q'
