import { useEffect, useState } from "react";
import {
  getInitialData,
  searchProduct,
  getApplication,
} from "./services/fetchData";
import Dropdown from "./components/Dropdown";

import InputTextField from "./components/InputTextField";
import { Search } from "@mui/icons-material";

import {
  Button,
  Card,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";

const ProductSearch = () => {
  const [data, setData] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    (async () => {
      const initialData = await getInitialData("");
      setData(initialData); // set your state hook
    })();
  }, []);

  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [selectedCategories, setCategories] = useState([]);
  const [productName, setProductName] = useState([]);

  const handleIndustryChange = async (s) => {
    setSelectedIndustries(s);
    const applications = await getApplication(s);
    setProductList(applications);
  };

  const handleApplicationChange = (s) => {
    setSelectedApplications(s);
  };
  const handleCategoryChange = (s) => {
    setCategories(s);
  };

  const searchProductData = async () => {
    try {
      const searchData = await searchProduct(
        selectedIndustries,
        selectedApplications,
        selectedCategories,
        productName
      );
      if (searchData.length < 1) {
        alert("No product available for given search criteria");
      }
      setProductList(searchData);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <>
      <Card>
        <Grid container sx={{ p: 12 }} spacing={2}>
          <Grid item sm={12} sx={{ mt: 0.5 }} textAlign="left">
            <Dropdown
              label="Industry"
              dataSet={data.Industry}
              getOptionLabel="IndustryName"
              getOptionValue="ID"
              name="industry"
              selectedValue={selectedIndustries}
              onChange={(e) => handleIndustryChange(e)}
              // isRequired
            />
          </Grid>
          <Grid item sm={12} sx={{ mt: 0.5 }} textAlign="left">
            <Dropdown
              label="Application"
              dataSet={data.Application}
              getOptionLabel="ApplicationName"
              getOptionValue="ID"
              name="application"
              selectedValue={selectedApplications}
              onChange={(e) => handleApplicationChange(e)}
              // isRequired
            />
          </Grid>
          <Grid item sm={12} sx={{ mt: 0.5 }} textAlign="left">
            <Dropdown
              label="Category"
              dataSet={data.Category}
              getOptionLabel="CategoryName"
              getOptionValue="ID"
              name="category"
              selectedValue={selectedCategories}
              onChange={(e) => handleCategoryChange(e)}
              // isRequired
            />
          </Grid>
          <Grid item sm={12}>
            <InputTextField
              label="Product Name"
              value={productName}
              onChange={setProductName}
              //maxLength={LettersRegex}
              //isRequired
            />
          </Grid>
          <Grid sm={1} item justifyContent="center" alignItems="center">
            <Button
              variant="outlined"
              className="border-button"
              sx={{ mt: 0 }}
              onClick={searchProductData}
            >
              <Search /> {" Search"}
            </Button>
          </Grid>
          <Grid sm={12} item justifyContent="center" alignItems="center">
            {productList?.map((product) => (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow
                      style={{
                        backgroundColor: "#e4e4e4",
                        padding: "10px",
                        height: "10px",
                      }}
                    >
                      <TableCell
                        style={{
                          color: "#0e568e",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        {product.CategoryName} - {product.ProductName}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {product.ProductDocument?.map((doc) => (
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            color: "#008ce2",
                            fontSize: "13px",
                          }}
                        >
                          {doc.DocumentOrgName} - {doc.DocumentTypeName}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ))}
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default ProductSearch;
