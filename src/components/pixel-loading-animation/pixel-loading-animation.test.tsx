import React from 'react'
import { render } from '@testing-library/react'
import { PixelLoader } from './pixel-loading-animation'

describe('Pixel Loading Component', () => {
    test('It should render', () => {
        const res = render(<PixelLoader />)
        expect(res.asFragment()).toMatchSnapshot()
    })
})