import React, { ReactElement } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

type Props = {
    children: React.ReactNode;
};


export const ScrollWrapper = ({ children }: Props) => {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>

}
