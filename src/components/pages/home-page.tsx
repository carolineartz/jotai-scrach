import { Account, accountAtomsAtom } from '@/data'
import { useLogPropsChanged } from '@/util/use-log-props-changed'
import { PrimitiveAtom, useAtom } from 'jotai'
import { memo } from 'react'

export const Home = memo(() => {
  console.log('rendering Home')
  const [accountAtoms, dispatch] = useAtom(accountAtomsAtom)

  return (
    <>
      {accountAtoms.map((accountAtom: any, i) => {
        return <AccontListItem key={i} accountAtom={accountAtom} dispatch={dispatch} />
      })}
    </>
  )
})

const AccontListItem = memo((props: { accountAtom: PrimitiveAtom<Account>; dispatch: any }) => {
  const { accountAtom, dispatch } = props
  const [account, setAccount] = useAtom(accountAtom)
  useLogPropsChanged(props, 'AccontListItem')
  console.log('rendering AccontListItem', account.id)

  return (
    <div className="flex">
      <div className="flex-1">
        <input
          className="input input-bordered input-accent w-full max-w-xs input-sm"
          type="text"
          value={account.name}
          onChange={e => {
            // @ts-ignore
            setAccount(oldValue => ({ ...oldValue, name: e.target.value }))
          }}
          placeholder="Account name"
        />
      </div>

      <div className="flex-">
        {/* <button onClick={remove} className="btn btn-square btn-outline btn-sm"> */}
        <button
          onClick={() => dispatch({ type: 'remove', atom: accountAtom })}
          className="btn btn-square btn-outline btn-sm"
        >
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
