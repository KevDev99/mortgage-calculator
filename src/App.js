import React, { useState } from 'react'

/** MUI */
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import CalcSlider from './components/CalcSlider';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'light' : 'light',
        },
        typography: {
          fontFamily: 'Nunito'
        }
      }),
    [prefersDarkMode],
  );

  const [formData, setFormData] = useState({
    purchasePrice: 150000,
    downPayment: 150000,
    repaymentTime: 25,
    interestRate: 3,
  });

  const [principalLoanAmount, setPrincipalLoanAmount] = useState(null);
  const [estPrMonth, setEstPrMonth] = useState(null);

  const onChange = (id, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const getMortgageQuote = () => {
    // Monthly Mortgage Payments formular: M = P[r(1+r)^n/((1+r)^n)-1)]
    // Source: https://www.codementor.io/projects/web/mortgage-calculator-web-app-d16bqrq2q3

    const calculatedPrincipalLoanAmount = formData.purchasePrice - formData.downPayment;
    setPrincipalLoanAmount(calculatedPrincipalLoanAmount);

    const P = calculatedPrincipalLoanAmount;
    const mR = (formData.interestRate / 12) / 100;
    const n = formData.repaymentTime * 12;
   
    setEstPrMonth(Math.floor((P * ((mR * ((1 + mR) ** n) / (((1 + mR) ** n) - 1))))));
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ mt: 7, }} >
        <h1 variant="h2" >Mortgage Calculator</h1>
        <Box sx={{ mt: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CalcSlider label="Purchase price"
            id='purchasePrice'
            onChange={onChange}
            marks={true}
            min={100000}
            max={1000000}
            defaultValue={150000}
            step={50000}
            valueText={`$ ${formData.purchasePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} />
          <CalcSlider label="Down payment"
            id='downPayment'
            onChange={onChange}
            marks={true}
            min={0}
            max={1000000}
            defaultValue={150000}
            step={50000}
            valueText={`$ ${formData.downPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} />
          <CalcSlider label="Repayment time"
            id='repaymentTime'
            onChange={onChange}
            marks={false}
            min={5}
            max={35}
            defaultValue={25}
            step={5}
            valueText={`${formData.repaymentTime} years`} />
        </Box>
        <Box sx={{ mt: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CalcSlider label="Interest Rate"
            id='interestRate'
            onChange={onChange}
            marks={false}
            min={1}
            max={10}
            defaultValue={3}
            step={1}
            valueText={`${formData.interestRate}%`} />

          {principalLoanAmount !== null && <>
            <Box width={250}>
              <Typography>Loan amount</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }} >$ {principalLoanAmount}</Typography>
            </Box>

            <Box width={250}>
              <Typography>Estimated pr. month</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }} >$ {estPrMonth}</Typography>
            </Box></>}


        </Box>
        <Box sx={{ mt: 5 }}>
          <Button onClick={getMortgageQuote} variant="contained" size='large'>
            Get a mortgage quote
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
