import { AppBar, Box, Grid2, IconButton, InputBase, Toolbar, Typography, useTheme } from '@mui/material'
import React, { FC, useContext } from 'react'
import {LightMode, DarkMode, Search, NotificationsNone, MenuOutlined} from '@mui/icons-material';
import { ColorModeContext } from "../../theme";
import { useStyles } from './styles';
import { useAppSelector } from '../../utils/hook';
import FlexBetween from '../Flex-Between/indext';
import { ITopBarProps } from '../../common/types/topbar';

const TopBarComponent: FC<ITopBarProps> = (props:ITopBarProps): JSX.Element => {
  const theme = useTheme()
  const colorMode: any = useContext(ColorModeContext)
  const classes = useStyles()
  const user = useAppSelector((state) => state.auth.user)
  const {setIsOpen, isOpen} = props

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolBar}>
        <FlexBetween>
          <MenuOutlined className = {classes.menuIcon} onClick = {() => setIsOpen(!isOpen)}/>
          <Typography variant= 'h3'>
          Welcome {sessionStorage.getItem('name')}
          </Typography></FlexBetween>
        <Box display='flex'>
          <Grid2 onClick={colorMode.toggleColorMode} className={classes.iconBlock}>
            <IconButton className={classes.themeIcon}>
              {theme.palette.mode === 'dark' ? (<DarkMode />) : (<LightMode />)}
            </IconButton>
            <IconButton>
              <NotificationsNone />
            </IconButton>
          </Grid2>
          <Grid2 className={classes.searchBlock}
          >
            <IconButton className={classes.searchIcon}>
              <Search />
            </IconButton>
            <InputBase className={classes.searchInput} placeholder='Поиск' />
          </Grid2>

        </Box>
      </Toolbar>
    </AppBar>
    // <Box className={classes.root}>
    //     <Grid2>Welcome Alex</Grid2>
    // <Box display='flex'>
    //     <Grid2 onClick={colorMode.toggleColorMode} className={classes.iconBlock}>
    //     <IconButton className={classes.themeIcon}>
    //         {theme.palette.mode === 'dark' ? (<DarkModeIcon />) : (<LightModeIcon />)}
    //     </IconButton>
    //     <IconButton>
    //       <NotificationsNoneIcon />
    //     </IconButton>
    //     </Grid2>
    //     <Grid2 className = {classes.searchBlock}  
    //             >
    //       <IconButton className = {classes.searchIcon}>
    //         <SearchIcon/>
    //       </IconButton>
    //       <InputBase className={classes.searchInput} placeholder = 'Поиск'/>
    //     </Grid2>

    // </Box>
    // </Box>
  )
}

export default TopBarComponent
//hi