import React, {Component } from 'react';
import _AppBar from '../Appbar/appbar';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import './checkout.css'
import RaisedButton from 'material-ui/RaisedButton';
import firebaseFirestore from "../../services/firebaseFirestore";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter
  } from 'material-ui/Table';

export default class Checkout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            college_doc_id: window.localStorage.getItem('college_doc_id'),
            college_doc_data: JSON.parse(window.localStorage.getItem('college_doc_data')),
            listItems: [],
            total_size :0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            checked : false,
            size_visibility: 'none',
            display_next: false,
            display_proceed_text: 'Next',
            total: 0
        };

        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
    
        this.loadData();
    }


    loadData = () => {
        const { college_doc_data } = this.state;

        let ref = firebaseFirestore.collection('collegeRegistrations');
        let playersNameList = [];

        Object.keys(college_doc_data).map(async key => {
            let data = college_doc_data[key];

            if(typeof data !== 'object' || key === 'accompanyingFacultyMembers') {
                return;
            }

            //console.log(key);

            let snapshot = await ref.doc(this.state.college_doc_id).collection(key).get();
            for(let doc of snapshot.docs) {
                let playerData = doc.data();
                if(playerData.name.trim() === '') {
                    return;
                }

                playersNameList.push(playerData.name);
            }

            //console.log(playersNameList);
            // got the list remove the redundant ones
            playersNameList = playersNameList.filter(this.onlyUnique);

            // prepare the component and then render
            let listItems = [];
            listItems = playersNameList.map((val, i, arr) => <ListItem key={i} primaryText={val} />);
            this.setState({ listItems: listItems, total_size: listItems.length });
        });
    }

    onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    updateCheck = () => {
        this.setState((oldState) => {

            if(!oldState.checked) {
                return {
                    size_visibility: 'block',
                    checked: !oldState.checked
                }
            } else {
                return {
                    checked: !oldState.checked,
                    size_visibility: 'none'
                  };
            }

            
          });
    }

    render() {

        let { s, m , l, xl, xxl, listItems, college_doc_data } = this.state;
        let total_items = 0;
        total_items = s + m + l + xl + xxl;

        return (

        <div className="bg bg-checkout" style={{ height:'100vh',top:0, /* background: `url('https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/background.png?alt=media&token=13f7c589-3fb9-44ec-8768-7426eaa54b67') no-repeat center \ center` */ }} >
                <_AppBar color="rgba(255,255,255,1)" handleOpen={this.props.handleOpen} handleClose={this.props.handleClose} />

                <div style={{ maxWidth:  300, minHeight: 700,background: '#fff', borderRadius: 20,border: '0.5px solid #ccc', marginTop: '15vh', left: '5vh', position: 'absolute' }} >
                <h3 style={{ padding: "10px", color: "#000" }} >
                    Contingent list | Total players: {this.state.total_size}
                </h3>
                
                <div style={{ width:  300, minHeight: 450 }} className="subtask-generate" >
                <List>
                    {this.state.listItems}
                </List>
                </div>
                </div>

                <div style={{ maxWidth:  650,background: '#fff', borderRadius: 20,border: '0.5px solid #ccc', marginTop: '15vh', right: '5vh', float:'right', position: 'absolute' }} >
                <RaisedButton onClick={(e) => {

                    const def = 1800;
                    let total_s = this.state.s + this.state.m + this.state.l + this.state.xl + this.state.xxl;
                    //console.log(total_s);
                    let total = total_s*200 + 1800*this.state.listItems.length;

                    if(this.state.display_proceed_text === 'Next') {
                        this.setState({ display_next: !this.state.display_next, display_proceed_text: 'Go back and get some more swag', total: total  });
                    } else {
                        this.setState({ display_next: !this.state.display_next, display_proceed_text: 'Next' , total: total });
                    }

            
                }} label={this.state.display_proceed_text} style={{  display: this.state.display_proceed, margin: 20 }}
                
             />


                    {this.state.display_next ?
                    
                    <span>

<h3 style={{ padding: "10px", color: "#000", width: 650 }} >
                                    Grand total : {this.state.total} INR
                                    <h5 style={{ marginBottom: 0 }} >See breakup below</h5>
                                    <Divider style={{ marginTop: 5 }} />
                                     
                                    
                                </h3>

                                <div style={{  overflow: 'auto', paddingRight: 1, maxHeight: 750 }} >
                                <Table >
    <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
      <TableRow >
        <TableHeaderColumn>Item</TableHeaderColumn>
        <TableHeaderColumn>Item count</TableHeaderColumn>
        <TableHeaderColumn>Cost per item (INR) </TableHeaderColumn>
        <TableHeaderColumn>Total (INR)</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false} >
    <TableRow>
        <TableRowColumn>Contingent size</TableRowColumn>
        <TableRowColumn>{this.state.listItems.length}</TableRowColumn>
        <TableRowColumn>1600 + 200</TableRowColumn>
        <TableRowColumn>{this.state.listItems.length * 1800}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>T-Shirt (S)</TableRowColumn>
        <TableRowColumn>{this.state.s}</TableRowColumn>
        <TableRowColumn>200</TableRowColumn>
        <TableRowColumn>{this.state.s * 200}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>T-Shirt (M)</TableRowColumn>
        <TableRowColumn>{this.state.m}</TableRowColumn>
        <TableRowColumn>200</TableRowColumn>
        <TableRowColumn>{this.state.m*200}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>T-Shirt (L)</TableRowColumn>
        <TableRowColumn>{this.state.l}</TableRowColumn>
        <TableRowColumn>200</TableRowColumn>
        <TableRowColumn>{this.state.l * 200}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>T-Shirt (XL)</TableRowColumn>
        <TableRowColumn>{this.state.xl}</TableRowColumn>
        <TableRowColumn>200</TableRowColumn>
        <TableRowColumn>{this.state.xl * 200}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>T-Shirt (XXL)</TableRowColumn>
        <TableRowColumn>{this.state.xxl}</TableRowColumn>
        <TableRowColumn>200</TableRowColumn>
        <TableRowColumn>{this.state.xxl * 200}</TableRowColumn>
      </TableRow>
    </TableBody>

    <TableFooter
            adjustForCheckbox={false}
          >
            <TableRow>
            <TableHeaderColumn>Total items:</TableHeaderColumn>
            <TableHeaderColumn>{total_items}</TableHeaderColumn>
            <TableHeaderColumn>Grand Total: </TableHeaderColumn>
            <TableHeaderColumn>{200*this.state.s + 200*this.state.m + 200*this.state.l + 200*this.state.xl + 200*this.state.xxl + 1800*this.state.listItems.length} INR</TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    College: {college_doc_data.collegeName}
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    Contingent Leader: {college_doc_data.contingentLeaderName}
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    Contingent Leader Email: {college_doc_data.contingentLeaderEmail}
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    Contingent Leader Contact: {college_doc_data.contingentLeaderContactNo}
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                <RaisedButton style={{ marginTop: "15px" }} label="SUBMIT" onClick={(e) => {
                    let { s, m , l, xl, xxl, listItems } = this.state;
                    let grand_total = (s + m + l + xl + xxl) * 200 + listItems.length*1800;
                    let submittedData = {
                        t_shirts: {
                            s,
                            m,
                            l,
                            xl,
                            xxl
                        },
                        contingentSize: listItems.length,
                        grand_total
                    };

                    //console.log(submittedData);

                    window.print();

                    let ref = firebaseFirestore.collection('collegeRegistrations').doc(this.state.college_doc_id);
                    ref.update(submittedData).then(() => {
                        console.log("updated");
                        window.location = "/";

                    });

                }} />
                <p style={{ color: 'red' }} >After you click submit. Print the document, and our team will contact you soon regarding payment.</p>
                <p style={{ color: 'red' }} >-- Udghosh 2018 Core Team</p>
              </TableRowColumn>
            </TableRow>
          </TableFooter>
  </Table>
                </div>

                    </span>
                
                :
            
            
                <span>

                <h3 style={{ padding: "10px", color: "#000", width: 650 }} >
                                    Get official Udghosh T-shirt at flat 57% discount
                                </h3>
                                <div style={{ display: "inline" }} >
                                <span>
                                <img style={{ padding: 10 }} width={400} src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/tees%2Ftee2.jpg?alt=media&token=e48d707c-f5bb-4178-92cc-c94bd57400a8" />
                                
                                
                                </span>
                                <img style={{ padding: 10 }}  width={200} src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/tees%2Ftee.jpg?alt=media&token=388ffc74-8d06-4dbd-b61c-4b9dbfe6e77c" />
                                </div>
                                <span style={{ padding: 20, fontWeight: 300 }} >MRP. <b><sup>₹</sup>200</b> only for participants. Valid until stock lasts.</span>
                                                <Checkbox
                                        label="YES! Get me some official Udghosh 2018 swag"
                                        checked={this.state.checked}
                                        onCheck={this.updateCheck.bind(this)}
                                        style={{ padding: 30 }}
                                        />

                                        <div style={{  display: this.state.size_visibility, padding: 30, width:  350 }} >
                                        
                                            <TextField
                                            type="number"
                                            defaultValue={this.state.s}
                                            floatingLabelText="Small"
                                            onChange={(e,v) => {
                                                //console.log("s ",v);
                                                this.setState({ s: parseInt(v) })
                                            }}
                                            />
                                            <TextField
                                            type="number"
                                            defaultValue={this.state.m}
                                            floatingLabelText="Medium"
                                            onChange={(e,v) => {
                                                //console.log("m ",v);
                                                this.setState({ m: parseInt(v) })
                                            }}
                                            />
                                            <TextField
                                            type="number"
                                            defaultValue={this.state.l}
                                            floatingLabelText="Large"
                                            onChange={(e,v) => {
                                                //console.log("l ",v);
                                                this.setState({ l: parseInt(v) })
                                            }}
                                            />
                                            <TextField
                                            type="number"
                                            defaultValue={this.state.xl}
                                            floatingLabelText="Extra Large"
                                            onChange={(e,v) => {
                                                //console.log("xl ", v);
                                                this.setState({ xl: parseInt(v) })
                                            }}
                                            />
                                            <TextField
                                            type="number"
                                            defaultValue={this.state.xxl}
                                            floatingLabelText="Extra Extra Large"
                                            onChange={(e,v) => {
                                                //console.log("xxl ", v);
                                                this.setState({ xxl: parseInt(v) })
                                            }}
                                            />
                                        </div>

        </span>
            
            
            
            }

                </div>

            </div>
        );
    }

}