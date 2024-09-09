/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon,  BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import {  useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import { useSelector } from "react-redux";
import { RootState } from "../../app/storage/redux/store";
import { connectionError } from "../../app/utility/connectionError";
import { useEffect, useState } from "react";
import { UserNotFoundMessage } from "../../app/common/styledComponents/chat";
import { Select } from "../../app/common/styledComponents/upsert";
import { useGetProductsQuery } from "../../app/APIs/productApi";
import { useGetOrdersQuery } from "../../app/APIs/orderApi";
import Order from "../../app/models/Order";
import Product from "../../app/models/Product";

function OrderList() {
    const { data, isLoading, error } = useGetOrdersQuery(null);
    const { data: productsData, isLoading: productsLoading, error: productsError } = useGetProductsQuery(null);
    const navigate = useNavigate();
    const userData = useSelector((state: RootState) => state.auth);

    const [displayedOrders, setDisplayedOrders] = useState<Order[]>([]);
    const [orderNotFound, setOrderNotFound] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<string>('');

    useEffect(() => {
        if (data) {

            let filteredOrders = data;

            
            if (selectedProduct !== '') {
                filteredOrders = filteredOrders.filter(
                    (order: Order) => order.productId === selectedProduct
                );
            }

            setDisplayedOrders(filteredOrders);
            setOrderNotFound(filteredOrders.length === 0);
        }
    }, [ data, selectedProduct]);


   

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProduct(e.target.value);
    };


    let content;

    if (isLoading || productsLoading) {
        content = (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    } else if (error || productsError) {
        const fetchError = (error as FetchBaseQueryError) || (productsError as FetchBaseQueryError);
        const errorMessage = fetchError?.data as string;
        console.log(errorMessage)
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("orders")}</ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage && userData.role === SD_Roles.ADMINISTRATOR ? (
                        <>
                        <BackButton style={{ backgroundColor: "#002147" }}
                                onClick={() => navigate("/order/insert")}>Insert an order </BackButton>
                        </>

                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }
    else {
        if (displayedOrders.length > 0) {
            content = (
                displayedOrders.map((order: Order) => {
                    const product = productsData?.find((product: Product) => product.id === order.productId);
                    return (
                        <tbody key={order.id}>
                            <TableRow>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                <TableCell>{order.quantityOrdered}</TableCell>

                                {userData.role === SD_Roles.ADMINISTRATOR &&
                                    <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate(`/order/update/${order.id}`)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </ActionButton>
                                }
                            </TableRow>
                        </tbody>
                    );
                })
            )
        }

        content = (
            <>
                        <Header />
                        <SidePanel />
                        <OrdersTable>
                            <TableNav>
                                <TableHeader>Order List</TableHeader>
                                

                            <Select
                                value={selectedProduct}
                                onChange={handleProductChange}>
                                <option value="">All Products</option>
                                {productsData?.map((product: Product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </Select>

                            {userData.role == SD_Roles.ADMINISTRATOR &&
                                <AddButton onClick={() => navigate("/order/insert")}>
                                    <FontAwesomeIcon icon={faAdd} />
                                </AddButton>          
                             }               
                            </TableNav>
                            <Table>
                                <thead>
                                    <TableHead>
                                        <TableHeaderCell>Product</TableHeaderCell>
                                        <TableHeaderCell>Order Date</TableHeaderCell>
                                        <TableHeaderCell>Quantity Ordered </TableHeaderCell>
                                    </TableHead>
                                </thead>
                        {content}
                        {orderNotFound && 
                            <UserNotFoundMessage>Order not found</UserNotFoundMessage>}
                            </Table>
                        </OrdersTable>     
            </>
        );
    }
    return content;
}
export default withAuthorization(OrderList, [SD_Roles.ADMINISTRATOR]);