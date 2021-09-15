import React from 'react'
import './pixel-modal.css'

type PixelModalProps = {
    modal_title?: string,
    message_text?: string,
    cancel_text?: string,
    confirm_text?: string,
    confirmFunc?: any,
    cancelFunc?: any,
}

export const PixelModal = (_props: PixelModalProps) => {

    let title = _props.modal_title ? _props.modal_title : 'Dialog'
    let message_text = _props.message_text ? _props.message_text : 'Default Modal Message'
    let cancel_text = _props.cancel_text ? _props.cancel_text : 'Cancel'
    let confirm_text = _props.confirm_text ? _props.confirm_text : 'Confirm'

    const cancelHandler = () => {
        if (_props.cancelFunc) {
            _props.cancelFunc()
        }
    }

    const confirmHandler = () => {
        if (_props.confirmFunc) {
            _props.confirmFunc()
        }
    }

    return (
        <div aria-modal="true" className="nes-dialog-container">
          <div className="nes-dialog nes-container" id="dialog-default">
            <p className="title">{title}</p>
            <p>{message_text}</p>
            <menu className="dialog-menu">
              <button onClick={cancelHandler} className="nes-btn">{cancel_text}</button>
              <button onClick={confirmHandler} className="nes-btn is-primary">{confirm_text}</button>
            </menu>
          </div>
        </div>)
}