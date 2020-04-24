import React from 'react'
import { connect } from 'react-redux'
import Radio from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles';
import { green, blue, orange } from '@material-ui/core/colors';

import { setMenuBackgroundColor } from '../actions/theme'

const GreenRadio = withStyles({
    root: {
      color: green[700],
      '&$checked': {
        color: green[900],
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />)

const BlueRadio = withStyles({
    root: {
      color: blue[700],
      '&$checked': {
        color: blue[900],
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />)

const OrangeRadio = withStyles({
    root: {
      color: orange[700],
      '&$checked': {
        color: orange[900],
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />)

const SettingPage = (props) => {

    const { dispatch, state } = props

    const handleChange = e => {
        dispatch(setMenuBackgroundColor(e.target.value))
    }
    return (
        <div>
            <OrangeRadio
                checked={state.theme.menuBackgroundColor === orange[700]}
                onChange={handleChange}
                value={orange[700]}
                name="Orange"
            />
            <BlueRadio
                checked={state.theme.menuBackgroundColor === blue[700]}
                onChange={handleChange}
                value={blue[700]}
                name="Blue"
            />
            <GreenRadio
                checked={state.theme.menuBackgroundColor ===  green[700]}
                onChange={handleChange}
                value={green[700]}
                name="Green"
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    state: state
  })
  
  export default connect(mapStateToProps)(SettingPage)