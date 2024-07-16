import * as api from '../api'
import { focusAtom } from 'jotai-optics'
import { atomWithLazy, splitAtom, unwrap } from 'jotai/utils'

export const accountsResponseAtom = atomWithLazy(async () => {
  const response = await api.getAccounts()
  return response
})

accountsResponseAtom.debugLabel = 'accountsResponseAtom'

const accountsDataAtom = unwrap(accountsResponseAtom, () => ({}))
accountsDataAtom.debugLabel = 'accountsData'
// @ts-ignore
export const accountsAtom: WritableAtom<api.GetAccountsResponseAccounts> = focusAtom(accountsDataAtom, optic =>
  optic.prop('accounts')
)

accountsAtom.debugLabel = 'accountsAtom'

export const accountAtomsAtom = splitAtom(accountsAtom)
accountAtomsAtom.debugLabel = 'accountAtomsAtom'
