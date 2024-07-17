import { Account, accountAtomsAtom } from '@/data'
import { useLogPropsChanged } from '@/util/use-log-props-changed'
import { PrimitiveAtom, useAtom } from 'jotai'
import { ChangeEventHandler, memo, useCallback, useEffect } from 'react'
import { useUpdateEffect } from 'react-use'

// account list
export const Home = memo(() => {
  console.log('--rendering Home')
  const [accountAtoms, dispatch] = useAtom(accountAtomsAtom)

  return (
    <div className="flex flex-col">
      {accountAtoms.map((accountAtom: unknown) => {
        const item = accountAtom as PrimitiveAtom<Account>
        return <AccountItem key={item.toString()} accountAtom={item} dispatch={dispatch} />
      })}
    </div>
  )
})

const AccountItem = memo((props: { accountAtom: PrimitiveAtom<Account>; dispatch: any }) => {
  const { accountAtom, dispatch } = props
  const [account, setAccount] = useAtom(accountAtom)

  // useLogPropsChanged(props, 'AccontListItem')
  console.log(`--rendering AccountItem-${accountAtom.toString()}`, account.name)

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setAccount(oldValue => ({ ...oldValue, name: e.target.value }))
  }, [])

  const handleClickButton = useCallback(() => {
    dispatch({ type: 'remove', atom: accountAtom })
  }, [])

  return (
    <div className="flex flex-row">
      <div className="flex-none">
        <input
          className="input input-bordered input-accent w-full max-w-xs input-sm"
          type="text"
          value={account.name}
          onChange={handleChangeInput}
          placeholder="Account name"
        />
      </div>

      <div className="flex-none">
        {/* <button onClick={remove} className="btn btn-square btn-outline btn-sm"> */}
        <button onClick={handleClickButton} className="btn btn-square btn-outline btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
})
