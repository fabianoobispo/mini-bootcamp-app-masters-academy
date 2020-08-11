import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import MoodBadIcon from '@material-ui/icons/MoodBad';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import CheckIcon from '@material-ui/icons/Check';
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Tasks from "../../components/Tasks/Tasks";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import Button from '../../components/CustomButtons/Button';
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";

import { bugs, website, server } from "../../variables/general";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../variables/charts";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import CustomInput from "../../components/CustomInput/CustomInput";
import { InputLabel } from "@material-ui/core";
import Success from "../../components/Typography/Success";


import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


interface Props {
  classes: any;
}

interface State {
  value: number;
  creatingMessage: boolean;
  messageSuccess: boolean;
  messageFailed: boolean;

  estado: string;  
  data: Response[]; 
  dataEstado: Response[];
}

interface Response {
  cases: number;
  suspects: number;
  refuses:number;
  deaths: number;
  uf: string;
}



class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
      creatingMessage: false,
      messageSuccess: true,
      messageFailed: true,
      data: [],
      estado: "",
      dataEstado: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);


  }
  handleChange = (event: any, value: number) => {
    this.setState({ value });
  };

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  };

  

  //pegando os dados da api
  componentDidMount = async () => {
    const response = (await fetch(
      "https://covid19-brazil-api.now.sh/api/report/v1"
    ).then((resp) => resp.json())) as { data: Response[] };
    this.setState({ data: response.data });
  };

  render() {
    console.log(this.state.data);
    console.log(this.state.estado);

    var totalCasos=0;
    this.state.data.forEach((item) =>{
    totalCasos += item.cases
    })

    var totalSuspeitas=0;
    this.state.data.forEach((item) =>{
    totalSuspeitas += item.suspects
    })

    var totalMortes=0;
    this.state.data.forEach((item) =>{
    totalMortes += item.deaths
    })

    var totalCurados=0;
    this.state.data.forEach((item) =>{
    totalCurados += item.refuses
    })


    var casosEstado = 0
    var curadosEstado = 0
    var mortesEstado = 0
    var suspeitasEstado = 0
    this.state.data.map((item) =>{
      if(item.uf == this.state.estado){
        casosEstado = item.cases
        curadosEstado = item.refuses
        mortesEstado = item.deaths
        suspeitasEstado = item.suspects
      }
      
    })

    
    const { classes } = this.props;
    const { creatingMessage, messageFailed, messageSuccess } = this.state;
    return (
      <div>
        <h2>Brasil</h2>
        <GridContainer>

          {/* total de curados no Brasil*/}
          <GridItem xs={12} sm={6} md={3}>            
            <Card>
              <CardHeader color="success" stats={true} icon={true}>
                <CardIcon color="success">
                  <InsertEmoticonIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Total de curados</p>
                <h3 className={classes.cardTitle}>{totalCurados}</h3>
              </CardHeader>
              <CardFooter stats={true}>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>


          {/* total de casos no Brasil*/}
          <GridItem xs={12} sm={6} md={3}>            
            <Card>
              <CardHeader color="danger" stats={true} icon={true}>
                <CardIcon color="warning">
                  <MoodBadIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Total de casos no Brasil</p>
                <h3 className={classes.cardTitle}>{totalCasos}</h3>
              </CardHeader>
              <CardFooter stats={true}>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>


          {/* total de suspeitas no Brasil*/}
          <GridItem xs={12} sm={6} md={3}>            
            <Card>
              <CardHeader color="danger" stats={true} icon={true}>
                <CardIcon color="warning">
                  <AnnouncementIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Suspeitas no Brasil</p>
                <h3 className={classes.cardTitle}>{totalSuspeitas}</h3>
              </CardHeader>
              <CardFooter stats={true}>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>

           {/* total de mortes no Brasil*/}
           <GridItem xs={12} sm={6} md={3}>            
            <Card>
              <CardHeader color="danger" stats={true} icon={true}>
                <CardIcon color="danger">
                  <MoodBadIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Total de mortes no Brasil</p>
                <h3 className={classes.cardTitle}>{totalMortes}</h3>
              </CardHeader>
              <CardFooter stats={true}>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>

                 
         </GridContainer>


        <GridContainer>

          <GridItem xs={12} sm={6} md={3}> 


        <form>
        <FormControl className={classes.formControl} style={{width: 200}}>
          <InputLabel htmlFor="estado-simple">Estado</InputLabel>
          <Select
            value={this.state.estado}
            onChange={(e) => this.setState({ estado: e.target.value})}
            inputProps={{
                name:"estados", 
                id:"estado-simple"}}
          >
            <MenuItem value="">
              <em>Vazio</em>
            </MenuItem>
            <MenuItem value="MG">Minas gerais</MenuItem>
            <MenuItem value="RJ">Rio de Janeiro</MenuItem>
            <MenuItem value="SP">São Paulo</MenuItem>
            <MenuItem value="BA">Bahia</MenuItem>
            <MenuItem value="CE">Ceará</MenuItem>
            <MenuItem value="PA">Pará</MenuItem>
            <MenuItem value="MA">Maranhão</MenuItem>
            <MenuItem value="DF">Distrito Federal</MenuItem>
            <MenuItem value="AM">Amazonas</MenuItem>
            <MenuItem value="SC">Santa Catarina</MenuItem>
            <MenuItem value="PE">Pernambuco</MenuItem>
            <MenuItem value="PR">Paraná</MenuItem>
            <MenuItem value="ES">Espírito Santo</MenuItem>
            <MenuItem value="PB">Paraíba</MenuItem>            
            <MenuItem value="GO">Goiás</MenuItem>
            <MenuItem value="RS">Rio Grande do Sul</MenuItem>
            <MenuItem value="AL">Alagoas</MenuItem>
            <MenuItem value="MT">Mato Grosso</MenuItem>
            <MenuItem value="SE">Sergipe</MenuItem>
            <MenuItem value="PI">Piauí</MenuItem>
            <MenuItem value="RN">Rio Grande do Norte</MenuItem>
            <MenuItem value="RO">Rondônia</MenuItem>
            <MenuItem value="AP">Amapá</MenuItem>
            <MenuItem value="RR">Roraima</MenuItem>
            <MenuItem value="MS">Tocantins</MenuItem>
            <MenuItem value="TO">Mato Grosso do Sul</MenuItem>
            <MenuItem value="AC">Acre</MenuItem>   
          </Select>
        </FormControl>
        </form>

        </GridItem>
        </GridContainer>




{ this.state.estado ? 
         <GridContainer>

         {/* total de curados estado selecionado*/}
         <GridItem xs={12} sm={6} md={3}>            
  <Card>
    <CardHeader color="success" stats={true} icon={true}>
      <CardIcon color="success">
        <InsertEmoticonIcon />
      </CardIcon>
      <p className={classes.cardCategory}>Curados em {this.state.estado}</p>
      <h3 className={classes.cardTitle}>{curadosEstado}</h3>
    </CardHeader>
    <CardFooter stats={true}>
      <div className={classes.stats}>
        <DateRange />
        Last 24 Hours
      </div>
    </CardFooter>
  </Card>
</GridItem>
         
         
         {/* total de casos estado selecionado*/}
         <GridItem xs={12} sm={6} md={3}>            
  <Card>
    <CardHeader color="danger" stats={true} icon={true}>
      <CardIcon color="warning">
        <MoodBadIcon />
      </CardIcon>
            <p className={classes.cardCategory}>Total de casos em {this.state.estado}</p>
      <h3 className={classes.cardTitle}>{casosEstado}</h3>
    </CardHeader>
    <CardFooter stats={true}>
      <div className={classes.stats}>
        <DateRange />
        Last 24 Hours
      </div>
    </CardFooter>
  </Card>
</GridItem>
         
         
         {/* total de suspeitas estado selecionado*/}
         <GridItem xs={12} sm={6} md={3}>            
  <Card>
    <CardHeader color="danger" stats={true} icon={true}>
      <CardIcon color="warning">
        <AnnouncementIcon />
      </CardIcon>
      <p className={classes.cardCategory}>Suspeitas em {this.state.estado}</p>
      <h3 className={classes.cardTitle}>{suspeitasEstado}</h3>
    </CardHeader>
    <CardFooter stats={true}>
      <div className={classes.stats}>
        <DateRange />
        Last 24 Hours
      </div>
    </CardFooter>
  </Card>
</GridItem>
         
          {/* total de mortes estado selecionado*/}
          <GridItem xs={12} sm={6} md={3}>            
  <Card>
    <CardHeader color="danger" stats={true} icon={true}>
      <CardIcon color="danger">
        <MoodBadIcon />
      </CardIcon>
      <p className={classes.cardCategory}>Total de mortes em {this.state.estado}</p>
      <h3 className={classes.cardTitle}>{mortesEstado}</h3>
    </CardHeader>
    <CardFooter stats={true}>
      <div className={classes.stats}>
        <DateRange />
        Last 24 Hours
      </div>
    </CardFooter>
  </Card>
</GridItem>
         
                
         </GridContainer>
: <p>Escolha um estado.</p>

  }
 {/* 
        <GridContainer>

          <GridItem xs={12} sm={12} md={4}>
            <Card chart={true}>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
          <GridItem xs={12} sm={12} md={4}>
            <Card chart={true}>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
          <GridItem xs={12} sm={12} md={4}>
            <Card chart={true}>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        
        </GridContainer>
        <GridContainer>
          
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  ),
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  ),
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  ),
                },
              ]}
            />
          </GridItem>
          
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Salary", "Country"]}
                  tableData={[
                    ["1", "Dakota Rice", "$36,738", "Niger"],
                    ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                    ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                    ["4", "Philip Chaney", "$38,735", "Korea, South"],
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        
        </GridContainer>
        
       <GridContainer>
          
          <GridItem xs={12}>
          <Card>
              <CardHeader color="success">
                <div className={classes.messages}>
                  <h4 className={classes.cardTitleWhite}>Mensagens Positivas</h4>
                  {!creatingMessage && (
                    <Button 
                      color="transparent" 
                      variant="outlined" 
                      onClick={() => this.setState({ creatingMessage: true })}
                    >
                      Enviar Mensagem
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardBody>
                {!creatingMessage 
                  ? <React.Fragment>
                      <h5 className={classes.cardTitle}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac est pulvinar, tempor turpis id, 
                        vehicula magna.
                      </h5>
                      <p className={classes.cardCategory}>
                        Jane Doe
                      </p>
                    </React.Fragment> 
                  : <React.Fragment>
                      <GridContainer>
                        <GridItem xs={12}>
                          <CustomInput
                            labelText="Nome"
                            id="name"
                            color="success"
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12}>
                        <CustomInput
                          labelText="Mensagem"
                          id="message"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            multiline: true,
                            rows: 5
                          }}
                        />
                        </GridItem>
                      </GridContainer>
                    </React.Fragment>
                }
              </CardBody>
              {creatingMessage && (
                <CardFooter>
                  <Button color="danger" onClick={() => this.setState({ creatingMessage: false })} >Cancelar</Button>
                  <Button color="success">Enviar Mensagem</Button>
                </CardFooter>
              )}
              {messageFailed && (
                <CardFooter>
                  <div className={classes.stats}>
                    <Danger>
                      <Warning />
                      Falha ao enviar mensagem
                    </Danger>
                  </div>
                </CardFooter>
              )}
              {messageSuccess && (
                <CardFooter>
                  <div className={classes.stats}>
                    <Success>
                      <CheckIcon />
                      Mensagem enviada com sucesso
                    </Success>
                  </div>
                </CardFooter>
              )}
            </Card>
          </GridItem>
        </GridContainer> */}
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
