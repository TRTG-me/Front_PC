import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { getFavoriteAssets } from "../../store/thunks/assets";
import { Box, Grid2} from "@mui/material";
import { useStyles } from "./styles";
import AreaChart from "../../components/charts/area-chart";
import TrendUp from '../../assets/images/chart/trendUp.svg'
import TrendDown from '../../assets/images/chart/trendDown.svg'
import LineChart from "../../components/charts/line-chart";
import { IChartData } from "../../common/types/assets";


const Home: FC = (): JSX.Element => {
    const favoriteAssets: IChartData[] = useAppSelector(state => state.assets.favoriteAssets)
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
        const currentPrice = element.singleAsset.map(
            (element: any) => element.current_price
        )
       
        const changePrice = element.singleAsset.map(
            (element: any) => element.price_change_percentage_24h
        )
                     return (
            <Grid2   size={{ xs: 12, sm: 6, lg: 6 }} key={element.name}>         
                 <Grid2 container className={classes.topCardItem}>
                      <Grid2  size={{ xs: 12, sm: 6, lg: 6 }}>  
                <h3 className={classes.assetName}>{element.name}</h3>
                    <div className={classes.itemDetails}>
                        <h3 className={classes.cardPrice}>
                            ${currentPrice}
                                </h3>
                                <Box
                                className={
                                    changePrice > 0
                                        ? `${classes.priceTrend} ${classes.trendUp}`
                                        : `${classes.priceTrend} ${classes.trendDown}`
                                }
                            >
                                {changePrice > 0 ? (
                                    <img src={TrendUp} alt="TrendUp" />
                                ) : (
                                    <img src={TrendDown} alt="TrendDown" />
                                )}
                                <span>{Number(changePrice).toFixed(2)}%</span>
                            </Box> 
                            </div>
                    </Grid2>
                      <Grid2  size={{ xs: 12, sm: 6, lg: 6 }}>  
                <AreaChart data={element.price_chart_data}/>
                      </Grid2>
                </Grid2>
            </Grid2>
                    
        )
    })
    return (
        <Box className = {classes.root}>
                <Grid2 container spacing={2} className={classes.areaChart}>
                   {renderFavoriteBlock}
                </Grid2>
                <Grid2 container className={classes.lineChartBlock}>
                <Grid2  size={{ xs: 12, sm: 12, lg: 12}}> 
                {filteredArray.length > 0 && <LineChart data={filteredArray} />}
                    </Grid2>

                </Grid2>

        </Box>
    );
};
export default Home;