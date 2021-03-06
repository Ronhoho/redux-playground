import React, { useRef } from 'react'
import { makeStyles } from "@material-ui/core/styles"

export default (props) => {
    
    const { getSelectArea } = props

    var position = { top: 0, left: 0 }  

    const useStyles = makeStyles(() => ({
        board: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            userSelect: 'none'
        },
        helper: {
            position: 'absolute',
            border: '1px dashed #000'
        }
    }))

    const board = useRef()

    const helper = useRef()

    const classes = useStyles()

    const handleMouseDown = e => {
        const { x, y } = board.current.getBoundingClientRect()
        position = { top: e.clientY - y, left: e.clientX - x }
        board.current.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    }
    const handleMouseUp = () => {
        const { x, y } = board.current.getBoundingClientRect()
        window.removeEventListener('mouseup', handleMouseUp)
        board.current.removeEventListener('mousemove', handleMouseMove)

        var left = Number(helper.current.style.left.split('px')[0])
        var top = Number(helper.current.style.top.split('px')[0])
        var width = Number(helper.current.style.width.split('px')[0])
        var height = Number(helper.current.style.height.split('px')[0])

        getSelectArea({ left, top, width, height , x, y })

        helper.current.style = null
    }
    const handleMouseMove = e => {
        const { x, y } = board.current.getBoundingClientRect()
        const mouseX = e.clientX - x
        const mouseY = e.clientY - y

        var left = mouseX < position.left ? mouseX : position.left
        var top = mouseY < position.top ? mouseY : position.top
        var width = Math.abs(position.left - mouseX)
        var height = Math.abs(position.top - mouseY)

        helper.current.style.top = top + 'px'
        helper.current.style.left = left + 'px'
        helper.current.style.width = width + 'px'
        helper.current.style.height = height + 'px'
    }
    return (
        <div>
            <div ref={board} className={classes.board} onMouseDown={handleMouseDown}></div>
            <div ref={helper} className={classes.helper}></div>
        </div>
    )
}