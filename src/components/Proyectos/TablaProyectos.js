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
    TableFooter,
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


export const TablaProyectos = ({ proyectos }) => {

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
        <div >
            <TableContainer component={Paper} className={classes.tableContainer} >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>NOMBRE</TableCell>
                            <TableCell className='text-center fw-bold bg-dark text-white'>DURACION</TableCell>
                            <TableCell className='text-center fw-bold bg-dark text-white'>COTIZACION</TableCell>
                            <TableCell className='text-center fw-bold bg-dark text-white'>FIN</TableCell>
                            <TableCell className={classes.tableHeaderCell}>ESTADO</TableCell>
                            <TableCell className={classes.tableHeaderCell}>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='bg-dark'>
                        {proyectos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <Grid container>
                                        <Grid item lg={2}>
                                            <Avatar alt={row.nombre} src='.' className={classes.avatar} />
                                        </Grid>
                                        <Grid item lg={10}>
                                            <Typography className='text-white fs-5 ms-md-3'>{row.nombre}</Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>
                                    <Typography className='text-white text-center fs-5' variant="subtitle2">{row.duracion}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography className='text-white text-center fs-5' variant="subtitle2"> $ {row.cotizacion}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography className='text-white text-center fs-5' variant="subtitle2">
                                        {
                                            row.fechaFin[8] + row.fechaFin[9] + '-' + row.fechaFin[5] + row.fechaFin[6] + '-' + 
                                            row.fechaFin[0] +row.fechaFin[1] + row.fechaFin[2] + row.fechaFin[3]
                                        }
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        className={classes.status}
                                        style={{
                                            backgroundColor:
                                                ((row.estado === 'Completado' && 'green') ||
                                                    (row.estado === 'Desarrollo' && 'orange')
                                                )
                                        }}
                                    >{row.estado}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Link className='btn btn-outline-info me-3' to={`/pro/${row.id}`}> Administrar </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[5, 8, 10, 15]}
                            component="div"
                            count={proyectos.length}
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
