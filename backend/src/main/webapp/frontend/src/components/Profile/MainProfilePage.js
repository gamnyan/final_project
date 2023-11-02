import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
   switch (step) {
      case 0:
         return <AddressForm />;
      case 1:
         return <PaymentForm />;
      case 2:
         return <Review />;
      default:
         throw new Error("Unknown step");
   }
}

export default function MainProfilePage() {
   const [activeStep, setActiveStep] = React.useState(0);

   const handleNext = () => {
      setActiveStep(activeStep + 1);
   };

   const handleBack = () => {
      setActiveStep(activeStep - 1);
   };

   return (
      <React.Fragment>
         <CssBaseline />
         <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
               <Typography component="h1" variant="h4" align="center">
                  My Page
               </Typography>
               {activeStep === steps.length ? (
                  <React.Fragment>
                     <Typography variant="h5" gutterBottom>
                        Thank you for your order.
                     </Typography>
                  </React.Fragment>
               ) : (
                  <React.Fragment>
                     {getStepContent(activeStep)}
                     <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        {activeStep !== 0 && (
                           <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                              Back
                           </Button>
                        )}
                     </Box>
                  </React.Fragment>
               )}
               <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
               </Button>
            </Paper>
         </Container>
      </React.Fragment>
   );
}
