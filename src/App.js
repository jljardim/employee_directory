import React from "react";
import { EmployeeProvider } from "./providers/Employee";
import Routes from "./routes";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import { APIProvider } from "./providers/Api";

const orangeTheme = createTheme ({
  palette: {
    primary: {
      main: orange[500]
    },
  },
});


class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={orangeTheme}>
        <APIProvider>
          <EmployeeProvider>
          <Routes />;
          </EmployeeProvider>
        </APIProvider>
      </ThemeProvider>
    
    );
  }
}

export default App;

/*       constructor(props) {
        super(props);

        this.state = {isHomePage: true, isRegisterPage: false };
      }
      
      onChangePage = () => {
        this.setState({
          isHomePage: !this.state.isHomePage,
          isRegisterPage: !this.state.isRegisterPage,
          
        })
      } */