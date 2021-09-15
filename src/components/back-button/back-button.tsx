import React from 'react'
import './back-button.css'
import { PixelIcon } from '../pixel-icon/pixel-icon'

type BackButtonProps = {
    onClick?: any,
}

// just for show, the routing is actually handled by a wrapping component
export const BackButton = (_props: BackButtonProps) => {
    
    if (_props.onClick) {
        return <button onClick={_props.onClick} className="nes-btn is-default back-button">
        <PixelIcon icon="back" />
    </button>
    }
    
    return <button className="nes-btn is-default back-button">
        <PixelIcon icon="back" />
    </button>
}