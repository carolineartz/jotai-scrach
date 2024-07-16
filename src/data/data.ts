import { atom } from 'jotai'
import * as api from '../api'
import { focusAtom } from 'jotai-optics'
import { atomWithLazy, splitAtom, unwrap } from 'jotai/utils'

export const accountsResponseAtom = atomWithLazy(async () => {
  const response = await api.getAccounts()
  return response
})
accountsResponseAtom.debugLabel = 'accountsResponseAtom'

const DEFAULT_ACCOUNTS = { accounts: [], meta: { people_ids: [] } }
// @ts-ignore
const accountsDataAtom = unwrap(accountsResponseAtom, () => DEFAULT_ACCOUNTS)
accountsDataAtom.debugLabel = 'accountsData'

// @ts-ignore
export const accountsAtom: WritableAtom<api.GetAccountsResponseAccounts> = focusAtom(accountsDataAtom, optic => {
  return optic.prop('accounts')
  // const foo = optic.to
  // return optic.valueOr(DEFAULT_ACCOUNTS)
})

accountsAtom.debugLabel = 'accountsAtom'

export const accountAtomsAtom = splitAtom(accountsAtom)
accountAtomsAtom.debugLabel = 'accountAtomsAtom'
