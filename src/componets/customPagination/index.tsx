import { TablePagination } from '@mui/material'
import React, { useState } from 'react'



type Props = {
    rowCount: number;
    newPageApi: any;
};


const CustomPagination = ({ rowCount, newPageApi }: Props) => {

    const [page, setPage] = useState<number>(1)


    function changePage(val: number) {
        setPage(val)
        newPageApi(val)

    }

    return (

        <TablePagination
            count={rowCount}
            page={page}
            onPageChange={(event, value) => changePage(value)}
            rowsPerPage={10}
            rowsPerPageOptions={[]}
        />
    )
}

export default CustomPagination
