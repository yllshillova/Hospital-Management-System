import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { TableCell, TableRow, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faAdd, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";
import { SD_Roles } from "../../app/utility/SD";
import { RootState } from "../../app/storage/redux/store";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import withAuthorization from "../../app/hoc/withAuthorization";
import { useGetProductsQuery } from "../../app/APIs/productApi";
import Product from "../../app/models/Product";
import { useEffect, useState } from "react";

function ProductList() {

    const { data, isLoading, error } = useGetProductsQuery(null);

    const userData = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [outOfStock, setOutOfStock] = useState<boolean>(false);
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);


    useEffect(() => {
        if (data) {


            let filteredProducts = data;

            if (outOfStock) {
                filteredProducts = filteredProducts.filter(
                    (product: Product) => product.quantity === 0
                );
            }
            else {
                filteredProducts = data;
            }

            setDisplayedProducts(filteredProducts);
        }
    }, [data, outOfStock]);


    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOutOfStock(e.target.checked);
    };

    let content;



    if (isLoading) {

        content = (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    }

    else if (error) {

        const fetchError = error as FetchBaseQueryError;
        const errorMessage = fetchError?.data as string;
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("products")} </ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage && userData.role === SD_Roles.ADMINISTRATOR ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/product/insert")}>Insert a product </BackButton>
                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }

    else {

        content = displayedProducts.map((product: Product) => {
            return (
                <tbody key={product.id}>
                    <TableRow>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.price}</TableCell>

                    </TableRow>
                </tbody>
            );
        });

        content = (
            <>
                <Header />
                <SidePanel />
                <OrdersTable>
                    <TableNav>
                        <TableHeader>Product List</TableHeader>
                        <label>
                            <input
                                type="checkbox"
                                checked={outOfStock}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleStockChange(e)}
                            />
                            Out Of Stock Products
                        </label>
                        <AddButton onClick={() => navigate("/product/insert")}  >
                            <FontAwesomeIcon icon={faAdd} />
                        </AddButton>
                    </TableNav>
                    <Table>
                        <thead>
                            <TableHead>
                                <TableHeaderCell> Name</TableHeaderCell>
                                <TableHeaderCell>Quantity </TableHeaderCell>
                                <TableHeaderCell>Price </TableHeaderCell>

                            </TableHead>
                        </thead>
                        {content}
                    </Table>
                </OrdersTable>
            </>
        );
    }
    return content;
}
export default withAuthorization(ProductList, [SD_Roles.ADMINISTRATOR]);