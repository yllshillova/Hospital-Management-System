/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import {SD_Roles } from "../../app/utility/SD";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { validBirthdayDate } from '../../app/utility/validBirthdayDate';
import withAuthorization from '../../app/hoc/withAuthorization';
import Order from '../../app/models/Order';
import Product from '../../app/models/Product';
import { useGetProductsQuery } from '../../app/APIs/productApi';
import { useCreateOrderMutation, useUpdateOrderMutation } from '../../app/APIs/orderApi';

interface OrderFormProps {
    id?: string;
    data?: Order;
}

const orderData: Order = {
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    date: new Date(),
    quantityOrdered : 0,
    productId: "",
    product: {} as Product
};

function OrderForm({ id, data }: OrderFormProps) { 
    const [orderInputs, setOrderInputs] = useState<Order>(data || orderData);
    const [createOrder] = useCreateOrderMutation();
    const [updateOrder] = useUpdateOrderMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
   
    const { data: productsData, isLoading: productsLoading, error: productsError } = useGetProductsQuery(null);



    const handleOrderInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, orderInputs);
        setOrderInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]); 

        const formData = new FormData();

        formData.append("Date", new Date(orderInputs.date!).toLocaleString());
        formData.append("ProductId", orderInputs.productId);
        formData.append("QuantityOrdered", orderInputs.quantityOrdered.toString());


        const currentLocation = window.location.pathname; 

        if (id) {
            formData.append("Id", id);
            const response = await updateOrder({ data: formData, id });

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Order has been updated", "success");
                navigate('/orders');
            }
        } else {
            const response = await createOrder(formData);

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Order has been created", "success");
                navigate('/orders');
            }
        }

        setLoading(false);
    };

    

    return (
        <>
            <Header />
            <SidePanel />
            <OuterContainer>
                <Container>
                    <FormContainer >
                        {loading && <MainLoader />}
                        <Title>
                            {id ? "Edit Contract" : "Add Contract"}
                        </Title>

                        {errorMessages.length > 0 && (
                            <div style={{ color: 'red' }}>
                                <ul>
                                    {errorMessages.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Form
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <FormGroup>
                                <Select
                                    name="productId"
                                    value={orderInputs.productId}
                                    onChange={handleOrderInput}
                                    disabled={productsLoading}
                                >
                                    <option value="">Select a product</option>
                                    {productsData?.map((product: Product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </Select>
                                {productsError && <div style={{ color: 'red' }}>Error loading products</div>}
                            </FormGroup>
                                <FormGroup>
                                <Label>Quantity Ordered</Label>
                                <Input
                                    type="number"
                                    name="quantityOrdered"
                                    value={orderInputs.quantityOrdered}
                                    onChange={handleOrderInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Order Date</Label>
                                <Input
                                    type="date"
                                    name="date"
                                    value={validBirthdayDate(orderInputs.date)}
                                    onChange={handleOrderInput}
                                />
                            </FormGroup>

                            


                            

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/orders")}>
                                    Back to Orders
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default withAuthorization(OrderForm, [SD_Roles.ADMINISTRATOR]);
