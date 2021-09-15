import React from 'react'
import './pixel-icon.css'

export class PixelIcon extends React.Component<{icon: string}, {}> {
    constructor(props: any) {
        super(props)
        this.getSvgUrl = this.getSvgUrl.bind(this)
    }

    getSvgUrl() {
        let icon_dir = '/assets/pixel_icons/svg'
        switch(this.props.icon) {
            case 'smile-face':
                return `${icon_dir}/015-smile.svg`
                // break;
            case 'trophy':
                return `${icon_dir}/007-trophy.svg`
                // break;
            case 'calendar': 
                return `${icon_dir}/003-calendar.svg`
                // break;
            case 'clock':
                return `${icon_dir}/047-clock.svg`
                // break;
            case 'podium':
                return `${icon_dir}/008-podium.svg`
                // break;
            case 'check':
                return `${icon_dir}/040-check.svg`
                // break;
            case 'menu':
                return `${icon_dir}/046-menu.svg`
                // break;
            case 'users':
                return `${icon_dir}/023-users.svg`
                // break;
            case 'gear':
                return `${icon_dir}/006-settings.svg`
                // break;
            case 'back':
                return `${icon_dir}/051-back.png`
                // break
            case 'forward':
                return `${icon_dir}/052-forward.png`
                // break
            
        }
    }

    render() {
        // TODO: Screen reader titles
        return <div className="pixel-icon-container">
            <img src={this.getSvgUrl()} alt=""/>
        </div>
    }
}