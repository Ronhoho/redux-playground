import React from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';

import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menu: {
        marginTop: '36px'
    }
}))

const Navbar = ({ path, state, dispatch }) => {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState(null)

    const isMenuOpen = Boolean(anchorEl)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null)
    }
    const handleLogOutClick = () => {
        handleMenuClose()
    }

    const navbarTitle = () => {
        switch (path) {
            case '/dashboard' :
                return <FormattedMessage id="dashboard"/>
            case '/user':
                return <FormattedMessage id="userProfile"/>
            case '/project':
                return <FormattedMessage id="project"/>
            case '/media':
                return <FormattedMessage id="media"/>
            case '/setting':
                return <FormattedMessage id="settings"/>
            default:
                return 'NotFound'
        }
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <MenuItem onClick={handleMenuClose} component={Link} to="/user"><FormattedMessage id="userProfile"/></MenuItem>
            <MenuItem onClick={handleLogOutClick}><FormattedMessage id="logout"/></MenuItem>
        </Menu>
      );

    return (
        <div className={classes.grow}>
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    {navbarTitle()}
                </Typography>
                <div className={classes.grow} />
                <IconButton>
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <IconButton
                    onClick={handleProfileMenuOpen}
                ><AccountCircle/>
                </IconButton>
            </Toolbar>
            {renderMenu}
        </div>
    )
}

const mapStateToProps = (state) => ({
    state: state
})

export default connect(mapStateToProps)(Navbar)