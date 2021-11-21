import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '30px 10px',
        maxWidth: 2000
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#212529',
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    }
}));


export const TablaClientes = ({ clientes }) => {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}>NOMBRE</TableCell>
                        <TableCell className={classes.tableHeaderCell}>CORREO</TableCell>
                        <TableCell className={classes.tableHeaderCell}>CUIT/CUIL</TableCell>
                        <TableCell className={classes.tableHeaderCell}>DIRECCION</TableCell>
                        <TableCell className={classes.tableHeaderCell}>TELEFONO</TableCell>
                        <TableCell className={classes.tableHeaderCell}>ACCIONES</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className='bg-dark'>
                    {clientes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <Grid container>
                                    <Grid item lg={2}>
                                        <Avatar alt={row.nombre} src='.' className={classes.avatar} />
                                    </Grid>
                                    <Grid item lg={10}>
                                        <Typography className='text-white fs-4 ms-lg-3 ms-md-2'>{row.apellidoyNombre}</Typography>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Typography className='text-white  fs-5' variant="subtitle2">{row.correo}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography className='text-white  fs-5' variant="subtitle2">{row.cuit_cuil}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography className='text-white  fs-5' variant="subtitle2"> {row.direccion}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography className='text-white  fs-5' variant="subtitle2"> {row.telefono}</Typography>
                            </TableCell>
                            <TableCell>
                                <Link className='btn btn-outline-info me-3' to={`/cli/${row.id}`}> Administrar </Link>
                                
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[5, 8, 10, 15]}
                        component="div"
                        count={clientes.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Table>
        </TableContainer>
    )
}
