import { ISingleAsset } from '../../common/types/assets'
import { useAppSelector } from '../../utils/hook'

import {Stack, Autocomplete, TextField} from '@mui/material'

const SearchBarComponent = () => {
   const assetsArray: ISingleAsset[] = useAppSelector(
          (state) => state.assets.assets,
      )
   

    return (
          <Stack spacing={2} sx={{width: 300}}>
            <Autocomplete 
            freeSolo
            clearOnEscape
            renderInput={(element) => (
              <TextField {...element} label='Поиск' slotProps={{
                input: {
                  ...element.InputProps,
                  type: 'search',
                                    
                }
              }}/>
            )} 
            options={assetsArray.map((element: {name:string}) => element.name)} />
          </Stack>
        )
    }
export default SearchBarComponent