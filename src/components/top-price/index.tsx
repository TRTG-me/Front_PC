import * as React from 'react';
import AssetsTableComponent from '../assets_table';



const TopPriceComponent = (props: any) => {
    const {assets} = props
   
         
   
  return <AssetsTableComponent assets={assets}/>
}

export default TopPriceComponent