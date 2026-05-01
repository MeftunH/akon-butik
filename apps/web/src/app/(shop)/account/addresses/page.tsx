import { redirect } from 'next/navigation';

import { fetchAccount, NOT_AUTHENTICATED, type CustomerAddress } from '../../../../lib/account';

import { AddressList } from './_components/AddressList';

export default async function AddressesPage() {
  const addresses = await fetchAccount<CustomerAddress[]>('/customers/me/addresses');
  if (addresses === NOT_AUTHENTICATED) redirect('/login?next=/account/addresses');

  return <AddressList initialAddresses={addresses} />;
}
