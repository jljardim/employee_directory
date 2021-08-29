import React, {Component} from "react";
import Loading from "../Loading";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {APIContext} from "../../providers/Api";

class EmployeeForm extends Component {
    static contextType = APIContext;
    constructor(props){
        super(props);
        this.state = {
            name:"",
            email: "",
            positions: [],
            selectedPosition: "",
            phone: "",
            isLoading: true,
            errorMessage: "",
        };
    }
    setPhone = (value)=> {
        /* const notANumber = value.replace(/\d/g, ""); // verifica se é somente numero
        console.log("notANumber", notANumber); */
        const ultimoDigito = value[value.length - 1];

        if (Number(ultimoDigito) || ultimoDigito === "-") {
            this.setState({phone: value});
        }
    };

    handleChange = (event) => {
        console.log("handleChange que", { event });
        const inputName = event.target.name;
        console.log("quem lançou o evento?",inputName);
        const value = event.target.value;
        console.log("agora sou value", value);
        if (inputName === "phone") {
           this.setPhone(value);
        }else {
            this.setState({[inputName]: event.target.value});
        }
    };

    checkEmailValidity = async () => {
        const {
            api: {get},
        } = this.context;
        const {validity} = await get (`/api/verifica-email/${this.state.email}`);
        
        return validity;
    }

    onSubmit = async (event) => {
        /* console.log("onSubmit", {event}); */
        event.preventDefault();
        
       const isValid = await this.checkEmailValidity();
       if (!isValid) {
           this.setState({
               errorMessage: "Informe um e-mail válido"
           });
       } else {
           // TODO: enviar para o servidor
           this.setState({
               errorMessage: "",
           });
       }
    };

    async componentDidMount() {
        console.log("componentDidMount faz oque?");
        const response = await fetch("/api/positions");

        const { positions } = await response.json();

        this.setState({
            positions,
            isLoading: false,
          });
    }


    render () {
        /* console.log("render", this.state); */
        return (
            <>
              {this.state.isLoading &&  <Loading />}
              {!this.state.isLoading && (
                <form onSubmit={this.onSubmit} style={{margin: 20}}>
                    <TextField
                     type="text"
                     name="name"
                     label="Name"
                     value={this.state.name}
                     onChange={this.handleChange}
                     required
                     fullWidth
                    />

                    <TextField
                     label="E-mail"
                     type="email"
                     name="email"
                     value={this.state.email}
                     onChange={this.handleChange}
                     required
                     fullWidth
                     helperText={this.state.errorMessage}
                     error={!!this.state.errorMessage}
                    />
                    
                    <TextField
                     label="Position"
                     select
                     value={this.state.selectedPosition}
                     onChange={this.handleChange}
                     name="selectedPosition"
                     fullWidth
                    >
                      {this.state.positions.map((position, index) => {
                          return(
                            <MenuItem key={index} value={position}>
                            {position}
                        </MenuItem>
                          );
                      })}
                    </TextField>

                    <TextField
                     label="Phone"
                     type="tel"
                     name="phone"
                     value={this.state.phone}
                     onChange={this.handleChange}
                     pattern="[0-9]{4}-[0-9]{4}"
                     placeholder="3333-3333" 
                     maxLength="9"
                     fullWidth
                    />

                    <Button
                     variant="contained"
                     size="medium"
                     color="primary"
                     type="submit"
                     style={{marginTop: 30, float: "right" }}                    
                    >
                      Send
                    </Button>
                </form>
                )}
           </>   

        );
    }
}

export default EmployeeForm;