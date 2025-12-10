export function compose(...middlewares: Function[]) {
  return (resolver: Function) => {
    return middlewares.reduceRight(
      (next, middleware) => middleware(next),
      resolver
    );
  };
}