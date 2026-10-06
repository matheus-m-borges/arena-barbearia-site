import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';

export function useGSAPContext(
  callback: (context: gsap.Context) => void,
  scope?: RefObject<HTMLElement | null>
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx);
    }, scope?.current || undefined);

    return () => ctx.revert();
  }, [callback, scope]);
}
