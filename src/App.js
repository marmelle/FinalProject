import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,
    Checkbox,Radio,Grid,Row,Col,
    Table,Modal
} from 'react-bootstrap';


class App extends Component {
    constructor(){
        super()
    }



    state = {
        name: "",
        cellnum: "",
        toppings: [],
        best: "",
        status: "",
        pool: "",
        records:[],
        show: false,

        selectedName: "",
        selectedCellnum:"",
        selectedToppings: [],
        selectedBest: "",
        selectedStatus: "",
        selectedPool: "",
        selectedId:""
    };

    componentDidMount(){

        this.refreshData();
    }



     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };


    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };


modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                        );
            else
                targetArray.push(event.target.value);

            var state = this.state.selectedToppings;
            state[fieldName] = targetArray;
            this.setState(state.selectedToppings);
        }
    };


    saveSurvey = ()=> {

        var data = {name: this.state.name,
                    cellnum: this.state.cellnum,
                    best: this.state.best,
                    toppings: this.state.toppings,
                    status: this.state.status,
                    pool: this.state.pool};
        console.log(data);
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
            }).catch((error)=> {

            });
            location.reload();

    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {
                    console.log('delete');
                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };

    editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        name: data.name,
                        
                       
                    })
                }).catch((error)=>{
                    
                });
        };
    };

openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        selectedName: data.name,
                        selectedCellnum: data.cellnum,
                        selectedToppings: data.toppings,
                        selectedBest: data.best,
                        selectedStatus: data.status,
                        selectedPool: data.pool,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });

            };
        };


        
    saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {name: this.state.selectedName,
                    cellnum: this.state.selectedCellnum,
                    toppings: this.state.selectedToppings,
                    best: this.state.selectedBest,
                    status: this.state.selectdStatus,
                    pool: this.state.selectedPool};
        delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show: false,
                selectedName: "" ,
                selectedCellnum: "" ,
                selectedToppings: [] ,
                selectedBest: "" ,
                selectedStatus:"",
                selectedPool: "",
            });
        }
    };


    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td className="text-center"><Button bsSize="xsmall"  bsStyle="success" onClick={this.openModal(item.id)}>Edit</Button>
                     <br/>
                     <br/>
                     <Button bsSize="xsmall" bsStyle="danger" onClick={this.deleteItem(item.id)}>Delete</Button>
                     
                        
                     </td>
                     <td>{item.id}</td>
                     <td>{item.name}</td>
                     <td>{item.cellnum}</td>
                     <td>{item.toppings.map((topping, mi)=>{
                        return <div key={mi}>
                        {topping}
                        </div>
                     })}</td>
                     <td>{item.best}</td>
                     <td>{item.status}</td>
                     <td>{item.pool}</td>
                     
                </tr>
          
          
          
            );
        });

let close = () => this.setState({ show: false })

        return (
            <div className="container">
            <h1> {this.state.try} </h1>
                <div className="page-header">
                   
                    <div className="myAppHeader">
                    ZIKA RESORT<br/> Cottage Reservation</div>
                </div>
                
                <div className="jumbotron">
                <Grid>
                        <Row>
                            <Col md={5}>
                                <Form>

                                    <FormGroup>
                                    <ControlLabel><h3>CUSTOMER'S INFORMATION</h3></ControlLabel><br/>
                                        <ControlLabel>Name</ControlLabel>
                                         <FormControl
                                            type="text"
                                            placeholder="Name of Reserved Person"
                                            value={this.state.name}
                                            onChange={this.onChange('name')}
                                            />
                                        
                                    </FormGroup>

            
                                    
                                    <FormGroup>
                                        <ControlLabel>Contact No.</ControlLabel>
                                        <FormControl
                                            type="text"
                                           placeholder="Customer's Contact No."
                                            value={this.state.cellnum}
                                            onChange={this.onChange('cellnum')}
                                            />
                                    </FormGroup>


                                    <FormGroup>
                                    <ControlLabel>------------------------------------------------------------------------------</ControlLabel>
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        
                         <Table><tr>
                                        <th><Radio name="pool" value="Cottage 1 (Big)"
                                               onChange={this.onChange('pool')}>Cottage 1 (Big) - 400 per 4 hours</Radio>
                                        </th>

                                       <th><Radio name="pool" value="Cottage 2 (Medium)"
                                               onChange={this.onChange('pool')}>Cottage 2 (Medium) - 300 per 4 hours</Radio>
                                       </th>

                                       <th><Radio name="pool" value="Cottage 3 (Small)"
                                               onChange={this.onChange('pool')}>Cottage 3 (Small) - 200 per 4 hours</Radio>
                                       </th>

                                       <th><Radio name="pool" value="Table with Umbrella"
                                               onChange={this.onChange('pool')}>Table with Umbrella (max. of 4 person) - 150 per 4 hours</Radio>
                                       </th>
                        </tr></Table>
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel><h3>TIME TO CONSUME</h3></ControlLabel><br/>
                                        <ControlLabel> Select Time </ControlLabel>
                                        <FormControl componentClass="select"
                                                     value={this.state.best}
                                                     onChange={this.onChange('best')}
                                            >
                                            <option value="---------">- - - - - - - - - - - - - - - - -</option>
                                            <option value="8:00 - 11:00">8:00 - 11:00</option>
                                            <option value="11:00 - 3:00">11:00 - 3:00</option>
                                             <option value="3:00 - 7:00">3:00 - 7:00</option>
                                              <option value="7:00 - 10:00">7:00 - 10:00</option>
                                         
                                        </FormControl>
                                    </FormGroup>
                                    
                                     <FormGroup>
                                        
                         <Table><tr><th>     <Radio name="status" value="Morning"
                                               onChange={this.onChange('status')}>A.M.</Radio></th>
                                       <th> <Radio name="status" value="Afternoon"
                                               onChange={this.onChange('status')}>P.M.</Radio></th></tr></Table>
                                    </FormGroup>

                                    

                                    <FormGroup>
                                    <ControlLabel>------------------------------------------------------------------------------</ControlLabel>
                                    </FormGroup>

                                    <FormGroup>
                                    <ControlLabel><h3> PERSON </h3></ControlLabel> <br/>
                                        <ControlLabel>Select person/s who will go</ControlLabel>
                                     
                                     <Checkbox value="Toddler"
                                                  checked={this.state.toppings.indexOf('Toddler')>=0 ? true:false}
                                                  onChange={this.checkboxChange('toppings')}>
                                            Toddler
                                        </Checkbox>
                                       <Checkbox value="Kid"
                                                  checked={this.state.toppings.indexOf('Kid')>=0 ? true:false}
                                                  onChange={this.checkboxChange('toppings')}>
                                            Kid
                                        </Checkbox>
                                       <Checkbox value="Adult"
                                                  checked={this.state.toppings.indexOf('Adult')>=0 ? true:false}
                                                  onChange={this.checkboxChange('toppings')}>
                                            Adult
                                        </Checkbox>
                                    </FormGroup>
                                    
                                
                                   
                                    
                                    <ButtonGroup vertical block>
                                        <Button bsStyle="primary" bsSize="large" onClick={this.saveSurvey} block>RESERVE!</Button>

                                    </ButtonGroup>

                                </Form>
                            </Col>
                           
                             <div className="myTitle">
                          Reservations </div>
                            <Col md={4}>
                          
                                <Table condensed striped bordered hover>
                                
                                    <thead>
                                    <tr>
                                    
                                        <th><center>Action</center></th>
                                        <th><center>Customer_No</center></th>
                                        <th><center>Reserved_to</center></th>
                                        <th><center>Contact_No.</center></th>
                                        <th><center>Person/s</center></th>
                                        <th><center>Time</center></th>
                                        <th><center>A.M_or_P.M.</center></th>
                                        <th><center>Cottage</center></th>
                                       
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                    
                                </Table>
                                    </Col>
                                
 
                  
                
                                
                                <div className="modal-container" style={{height: 200}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton><br/>
</Modal.Header>
                        
                        <Modal.Title id="contained-modal-title"><center>ZIKA RESORT<br/>Cottage Reservation</center></Modal.Title>
                       
                    
                    <Modal.Body>

                   
                    <Form>
                
                             <FormGroup>
                                    <ControlLabel><h3>CUSTOMER'S INFORMATION</h3></ControlLabel><br/>
                                        <ControlLabel>Name</ControlLabel>
                                         <FormControl
                                            type="text"
                                            placeholder="Name of Reserved Person"
                                            value={this.state.selectedName}
                                            onChange={this.modalonChange('selectedName')}
                                            />
                                        
                                    </FormGroup>
                                    
                                    
                                    <FormGroup>
                                        <ControlLabel>Contact No.</ControlLabel>
                                        <FormControl
                                            type="text"
                                           placeholder="Customer's Contact No."
                                            value={this.state.selectedCellnum}
                                            onChange={this.modalonChange('selectedCellnum')}
                                            />
                                    </FormGroup>


                                     <FormGroup>
                                    <ControlLabel>------------------------------------------------------------------------------</ControlLabel>
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        
                         <Table><tr>
                                        <th><Radio name="pool" value="Cottage 1 (Big)"
                                               onChange={this.modalonChange('selectedPool')}>Cottage 1 (Big) - 400 per 4 hours</Radio>
                                        </th>

                                       <th><Radio name="pool" value="Cottage 2 (Medium)"
                                               onChange={this.modalonChange('selectedPool')}>Cottage 2 (Medium) - 300 per 4 hours</Radio>
                                       </th>

                                       <th><Radio name="pool" value="Cottage 3 (Small)"
                                               onChange={this.modalonChange('selectedPool')}>Cottage 3 (Small) - 200 per 4 hours</Radio>
                                       </th>

                                       <th><Radio name="pool" value="Table with Umbrella"
                                               onChange={this.modalonChange('selectedPool')}>Table with Umbrella (max. of 4 person) - 150 per 4 hours</Radio>
                                       </th>
                        </tr></Table>
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel><h3>TIME TO CONSUME</h3></ControlLabel><br/>
                                        <ControlLabel> Select Time </ControlLabel>
                                        <FormControl componentClass="select"
                                                     value={this.state.selectedBest}
                                                     onChange={this.modalonChange('selecetedBest')}
                                            >
                                            <option value="---------">- - - - - - - - - - - - - - - - -</option>
                                            <option value="8:00 - 11:00">8:00 - 11:00</option>
                                            <option value="11:00 - 3:00">11:00 - 3:00</option>
                                             <option value="3:00 - 7:00">3:00 - 7:00</option>
                                              <option value="7:00 - 10:00">7:00 - 10:00</option>
                                         
                                        </FormControl>
                                    </FormGroup>
                                    
                                     <FormGroup>
                                        
                         <Table><tr><th>     <Radio name="status" value="Morning"
                                               onChange={this.modalonChange('selectedStatus')}>A.M.</Radio></th>
                                       <th> <Radio name="status" value="Afternoon"
                                               onChange={this.modalonChange('selectedStatus')}>P.M.</Radio></th></tr></Table>
                                    </FormGroup>

                                    

                                    <FormGroup>
                                    <ControlLabel>------------------------------------------------------------------------------</ControlLabel>
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel><h3> PERSON </h3></ControlLabel> <br/>
                                        <ControlLabel>Select person/s who will go</ControlLabel>
                                     
                                     <Checkbox value="Toddler"
                                                  checked={this.state.selectedToppings.indexOf('Toddler')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedToppings')}>
                                            Toddler
                                        </Checkbox>
                                       <Checkbox value="Kid"
                                                  checked={this.state.selectedToppings.indexOf('Kid')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedToppings')}>
                                            Kid
                                        </Checkbox>
                                       <Checkbox value="Adult"
                                                  checked={this.state.selectedToppings.indexOf('Adult')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedToppings')}>
                                            Adult
                                        </Checkbox>
                                    </FormGroup>
                                    
                                
                                   
                                   
                                    <ButtonGroup vertical block>
                                        <Button bsStyle="primary" bsSize="large" onClick={this.saveEdit(this.state.selectedId)} block>RESERVE!</Button>

                                    </ButtonGroup>

                                </Form>
                                </Modal.Body>
                        </Modal>
                 

</div>                
  </Row>
                    </Grid>
                      
                </div>            
            </div>
        );
    }
}

export default App;
