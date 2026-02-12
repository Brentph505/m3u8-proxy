declare namespace Deno {
  const env: {
    toObject(): Record<string, string>;
    get(key: string): string | undefined;
  };
  function readTextFile(path: string): Promise<string>;
}

declare function serve(
  handler: (req: Request) => Response | Promise<Response>,
  options?: { hostname?: string; port?: number }
): Promise<void>;
