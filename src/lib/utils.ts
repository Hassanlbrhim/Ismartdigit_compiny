export const uid = () => Math.random().toString(36).slice(2, 10);

/** Immutable deep set: setIn(obj, ["hero","title","ar"], "x") */
export function setIn<T>(obj: T, path: (string | number)[], value: unknown): T {
  if (!path.length) return value as T;
  const [k, ...rest] = path;
  const copy: any = Array.isArray(obj) ? [...(obj as any)] : { ...(obj as any) };
  copy[k] = setIn(copy[k], rest, value);
  return copy;
}

/** Resize + compress an uploaded image so it stays small enough to live in the JSON store. */
export function fileToDataUrl(file: File, max = 1100): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = () => reject(new Error("read"));
    r.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode"));
      img.onload = () => {
        const s = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.8));
      };
      img.src = r.result as string;
    };
    r.readAsDataURL(file);
  });
}
