import { Box, Typography, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { BasketItem } from "../../app/models/basket";
import { Order } from "../../app/models/order";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

interface Props {
    order: Order | undefined;
    setSelectedOrder: (id: number) => void;
}

export default function OrderDetails({order, setSelectedOrder}: Props) {
    const subtotal = order?.orderItems.reduce((sum,item) => sum + (item.quantity * item.price), 0) ?? 0;
    const address = order?.shippingAddress;
    
    return (<>
        <Box display="flex" justifyContent="space-between">
            <Typography sx={{ p: 2 }} gutterBottom variant="h4">
                Order #{order?.id}
            </Typography>
            <Button onClick={() => setSelectedOrder(0)} sx={{ m: 2 }} size="large" variant="contained">
                Back to Orders
            </Button>
        </Box>
        <BasketTable items={order?.orderItems as BasketItem[]} isBasket={false} />
        <Grid container>
            <Grid item xs={6}>
                <TableContainer component={Paper} variant={'outlined'}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={2}>Address</TableCell>
                                <TableCell align="left">{address?.address1}, {address?.address2}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}></TableCell>
                                <TableCell align="left">{address?.city}, {address?.state} {address?.zip}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}></TableCell>
                                <TableCell align="left">{address?.country}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <BasketSummary subtotal={subtotal} />
            </Grid>
        </Grid>
        </>);
}