import { useParams } from 'next/navigation'
import useSWR from 'swr';
import axios from '@/services/axios'
import { editIdForm } from '@/services/home';

type Params = {
  itemId: number;
};

type EditIdList = {
  // Define the structure of each item in the list according to your API response
  itemId: string;
  // Add other properties as needed
}[];

export default function EditItem() {

  const {itemId} = useParams() as Params;
  console.log("Item Id:", itemId);
  const { data:editIdList=[] } = useSWR<EditIdList>(itemId, ()=>editIdForm(itemId), axios);
  console.log(editIdList);

  

  return (
    <>
      <h1>Edit Item Id Testing</h1>
    </>
  );
}