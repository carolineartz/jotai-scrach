import { useAtom } from 'jotai'
import { focusAtom } from 'jotai-optics'

/* if an atom is created here, please use `useMemo(() => atom(initValue), [initValue])` instead. */
export function useFocusAtom(anAtom: any, keyFn: any) {
  return useAtom(focusAtom(anAtom, keyFn))
}

// // how to use it
// useFocusAtom(anAtom) {
//     useMemo(() => atom(initValue), [initValue]),
//     useCallback((optic) => optic.prop('key'), [])
// }
