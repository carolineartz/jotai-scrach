import { useEffect, useRef } from 'react'

/**
 * Utility hook to console log the props that have changed for a component.
 * Useful to inspect component re-rendering in response to changed props and apply optimizations.
 * @param props Component props
 */
export function useLogPropsChanged(props: { [prop: string]: unknown }, id?: string | number) {
  // cache the last set of props
  const prev = useRef(props)

  useEffect(() => {
    // check each prop to see if it has changed
    const changed = Object.entries(props).reduce(
      (a, [key, prop]: [string, unknown]) => {
        if (prev.current[key] === prop) return a
        return {
          ...a,
          [key]: {
            prev: prev.current[key],
            next: prop
          }
        }
      },
      {} as { [k: string]: any }
    )

    if (Object.keys(changed).length > 0) {
      console.group('Props That Changed' + (id ? ': ' + id : ''))
      console.log(changed)
      console.groupEnd()
    }

    prev.current = props
  }, [props])
}
