import React from 'react'
import FooterComponent from './footer';
import HeaderComponent from './header';

interface Props {
    children: React.ReactNode
}
const LayoutComponent = ({ children }: Props) => {
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <main>{children}</main>
            <FooterComponent></FooterComponent>
        </>
    )
}

export default LayoutComponent;