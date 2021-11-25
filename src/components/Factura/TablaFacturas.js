import React, { useEffect, useState } from 'react'
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
    Grid,
    Typography,
    TablePagination,
    TableFooter,
    Avatar,
} from '@material-ui/core';
import axios from 'axios';

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
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.90rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 10,
        padding: '5px 12px',
        display: 'inline-block',
    }
}));


export const TablaFacturas = ({ facturas }) => {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    const [detalles, setDetalles] = useState([])

    useEffect(() => {
        axios.get('https://tfi-admrec.herokuapp.com/detalles').then((response) => {
            setDetalles(response.data);
        });
    }, []);

    var facturasAll = [];

    facturas.forEach(factura => {
        var fact = { ...factura, descripcion: [] }
        facturasAll.push(fact);
    });

    // console.log( 'Antes de entrar al for: ', facturasAll);

    for (var i = 0; i < facturasAll.length; i++) {

        // eslint-disable-next-line no-loop-func
        detalles.forEach(detalle => {

            if (parseInt(detalle.FacturaId) === facturasAll[i].id) {

                console.log('Coinciden');

                facturasAll[i].descripcion.push(detalle.descripcion);
            }
        });
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <div >
            <TableContainer component={Paper} className={classes.tableContainer} >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>RAZON SOCIAL</TableCell>
                            <TableCell className='fw-bold bg-dark text-white'>PROYECTO</TableCell>
                            <TableCell className='text-center fw-bold bg-dark text-white'>TIPO FACTURA</TableCell>
                            <TableCell className='text-center fw-bold bg-dark text-white'>MEDIO DE PAGO</TableCell>
                            <TableCell className='text-center fw-bold bg-dark text-white'>TOTAL</TableCell>
                            <TableCell className='text-center fw-bold bg-dark text-white'>FECHA</TableCell>
                            <TableCell className={classes.tableHeaderCell}>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='bg-dark'>
                        {facturasAll.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <Grid container>
                                        <Grid item lg={2}>
                                            <Avatar alt={row.razonSocial} src='.' className={classes.avatar} />
                                        </Grid>
                                        <Grid item lg={10}>
                                            <Typography className='text-white fs-5' variant="subtitle2">{row.razonSocial}</Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>

                                <TableCell>

                                    {
                                        row.descripcion.map(proyecto => (

                                            <Grid container key={(Math.floor(Math.random() * (1000 - 1)) + 1)}>
                                                <Grid item lg={10}>
                                                    <Typography className='text-white fs-5'>{proyecto}</Typography>
                                                </Grid>
                                            </Grid>

                                        ))

                                    }


                                </TableCell>
                                <TableCell>
                                    <Typography className='text-white text-center fs-5' variant="subtitle2">{row.tipoFactura}</Typography>
                                </TableCell>
                                <TableCell className='text-white text-center fs-5'>
                                    <Typography
                                        className={classes.status}
                                        style={{
                                            backgroundColor:
                                                (
                                                    (row.medioPago === 'Efectivo' && '#3B6EF9') ||
                                                    (row.medioPago === 'Tarjeta' && 'green')
                                                )
                                        }}
                                    >{row.medioPago}</Typography>
                                </TableCell>
                                <TableCell className='text-center fs-5'>
                                    <Typography
                                        className={classes.status}
                                        style={{ backgroundColor: '#00B74A', color: 'black' }}
                                    >
                                        $ {row.total}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography className='text-white text-center fs-5' variant="subtitle2">
                                        {
                                            row.fecha[8] + row.fecha[9] + '-' + row.fecha[5] + row.fecha[6] + '-' +
                                            row.fecha[0] + row.fecha[1] + row.fecha[2] + row.fecha[3] + ' || ' + row.fecha[11] + row.fecha[12] +
                                            row.fecha[13] + row.fecha[14] + row.fecha[15] + row.fecha[16] + row.fecha[17] + row.fecha[18]
                                        }
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Link className='btn btn-outline-info me-3' to={`/fac/${row.id}`}> Administrar </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[5, 8, 10, 15]}
                            component="div"
                            count={facturas.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>

    )
}
