import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { getFavoriteAssets } from "../../store/thunks/assets";
import { Box, Grid2} from "@mui/material";
import { useStyles } from "./styles";
import AreaChart from "../../components/charts/area-chart";


const Home: FC = (): JSX.Element => {
    const favoriteAssets: any[] = useAppSelector(state => state.assets.favoriteAssets)
    const dispatch = useAppDispatch()
    const classes = useStyles()
    const fetchDataRef = useRef(false)
    const favoriteAssetName = useMemo(() => ['bitcoin', 'ethereum'], [])
    const filteredArray = favoriteAssets.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))

    const fetchData = useCallback((data: string[]) => {
        data.forEach((element: string) => {
            dispatch(getFavoriteAssets(element))
        })

    }, [dispatch])

    
    useEffect(() => {
        if (fetchDataRef.current) return
        fetchDataRef.current = true
        fetchData(favoriteAssetName)
            },[favoriteAssetName, fetchData])
    
    const renderFavoriteBlock = filteredArray.map((element: any)=> {
       console.log('Element',element)
        const currentPrice = element.data.prices[0]
               return (
            <Grid2   size={{ xs: 12, sm: 6, lg: 6 }} key={element.name}>         
                 <Grid2 container className={classes.topCardItem}>
                      <Grid2  size={{ xs: 12, sm: 6, lg: 6 }}>  
                <h3 className={classes.assetName}>{element.name}</h3>
                    <div className={classes.itemDetails}>
                        <h3 className={classes.cardPrice}>
                            ${currentPrice[1].toFixed(2)}
                            </h3>
                        </div>   
                    </Grid2>
                      <Grid2  size={{ xs: 12, sm: 6, lg: 6 }}>  
                <AreaChart data={element.data.prices}/>
                      </Grid2>
                </Grid2>
            </Grid2>
                    
        )
    })
    return (
        <Box className = {classes.root}>
                <Grid2 container spacing={2}>
                   {renderFavoriteBlock}
                </Grid2>
        </Box>
    );
};
export default Home;