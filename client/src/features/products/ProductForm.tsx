/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer ,SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { SD_Roles } from "../../app/utility/SD";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import withAuthorization from "../../app/hoc/withAuthorization";
import Product from '../../app/models/Product';
import { useCreateProductMutation } from '../../app/APIs/productApi';

interface ProductFormProps {
    data?: Product;
}

const productData: Product = {
    name: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    quantity: 0,
    price: 0,
};

function ProductForm({ data }: ProductFormProps) {

    const [productInputs, setProductInputs] = useState<Product>(data || productData);
    const [createProduct] = useCreateProductMutation();
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); 


    


    const handleProductInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const tempData = inputHelper(e, productInputs);
        setProductInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Name", productInputs.name);
        formData.append("Quantity", productInputs.quantity.toString());
        formData.append("Price", productInputs.price.toString());


              

        const currentLocation = window.location.pathname;

       
       const response = await createProduct(formData);

       if ('error' in response) {
           useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
       } else {
           toastNotify("Product has been created", "success");
           navigate('/products');
       }                        

        setLoading(false);
    };

    //const toggleIsDeleted = () => {
    //    setEmployeeInputs((prevInputs) => ({
    //        ...prevInputs,
    //        isActive: !prevInputs.isActive,
    //    }));
    //};

    let content;

        content = (
            <>
                <Header />
                <SidePanel />
                <OuterContainer>
                    <Container>
                        <FormContainer >
                            {loading && <MainLoader />}
                            <Title>
                                Add Product
                            </Title>

                            {/* Display error messages */}
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
                                    <Label>Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={productInputs.name}
                                        onChange={handleProductInput}
                                    />
                                </FormGroup>
                                
                                <FormGroup>
                                    <Label>Quantity</Label>
                                    <Input
                                        type="number"
                                        name="quantity"
                                        value={productInputs.quantity}
                                        onChange={handleProductInput}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Price</Label>
                                    <Input
                                        type="number"
                                        name="price"
                                        value={productInputs.price}
                                        onChange={handleProductInput}
                                    />
                                </FormGroup>

                                


                                <ButtonsContainer>
                                    <SubmitButton type="submit">
                                        Submit
                                    </SubmitButton>
                                    <BackToProductsButton onClick={() => navigate("/products")}>
                                        Back to Products
                                    </BackToProductsButton>
                                </ButtonsContainer>
                            </Form>
                        </FormContainer>
                    </Container>
                </OuterContainer>
            </>
        );
        return content;
    }

export default withAuthorization(ProductForm,[SD_Roles.ADMINISTRATOR]);
