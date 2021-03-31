import React, {Component} from 'react';
import './App.css'

import { BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';



const about = ()=>{
  return ( 
    <div className="container mt-5" align="center">
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">About Connect4</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        <div class="card text-center text-white bg-dark mb-3 col-6">
        <div class="card-header" aria-hidden="true" data-toggle="modal" data-target="#exampleModal">
        <p> To know about the game click <i  className="fa fa-info"></i></p>
        </div>
        <div class="card-body">
          <h5 class="card-title">Connect4</h5>
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Connect_Four.gif" className="my-4" alt="Game Instruction"/><br/>
          <a href="/player" class="btn btn-primary"><i class="fa fa-gamepad"></i> Game</a>
        </div>
        <div class="card-footer text-muted">
          Copyright <a href="https://ameen.click/">www.ameen.click</a> | All rights reserved
        </div>
      </div>
    </div>
    
  );
}


class App extends Component {


      constructor(props){
        super(props);
        this.state={
          player1: "",
          player2: "",
          yellow : "",
          blue: "",    
        }
      }

      menu = () =>{
        return(
          <div className="container menu">
            <div className="row col-sm">
            <div className="col">
              <button className="btn btn-primary btn-lg mx-5 col-1" disabled> </button><br/>
              <div class="input-group mb-3 my-5">
              <input type="text" class="form-control" placeholder="Enter Name" aria-label="Recipient's username" onInput={this.input1} value={this.state.player1} aria-describedby="basic-addon2"/>
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">Player1</span>
              </div>
              </div>
            </div>
            <div className="col">
              <button className="btn btn-warning btn-lg mx-5 col-1" disabled> </button><br/>
              <div class="input-group mb-3 my-5">
              <input type="text" class="form-control" placeholder="Enter Name" aria-label="Recipient's username" onInput={this.input2} value={this.state.player2} aria-describedby="basic-addon2"/>
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">Player2</span>
              </div>
              </div>
            </div>
            </div>
            <a href={this.state.player1 === "" || this.state.player2 ==="" ? "" : "/game"}>
                <button type="button" class="btn btn-outline-success"><i class="fa fa-play" aria-hidden="true" onClick={this.setCoin}></i>  Play</button>
            </a>
          </div>
        );
      }

    input1 = (event)=>{
      this.setState({
        player1: event.target.value
      })
    }

    input2 = (event)=>{
      this.setState({
        player2: event.target.value
      })
    }

    setCoin = () =>{
      if(this.state.player1 === "" || this.state.player2 ===""){
        alert("Fill the names"); 
        return;
      }
      this.setState({
        blue:this.state.player1,
        yellow:this.state.player2
      })
      localStorage.setItem("Blue",this.state.blue);
      localStorage.setItem("Yellow",this.state.yellow);
    }

    render() {
        return (
            <Router>
                <div className="App">

                 <Route path="/" exact component={about}/>  

                 <Route path="/player" exact component={this.menu}/> 

                <Route path="/game" exact render={() =>{
                  return(<Board />)}
                }/>  

                <Route path="/score" exact render={
                     ()=>{
                         return ( <h1>Score Card</h1>);
                     }
                 }/> 
              </div>
            </Router>
        );
    }
}

class Board extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      board: [["bg-light","bg-light","bg-light","bg-light","bg-light","bg-light","bg-light"],
              ["bg-light","bg-light","bg-light","bg-light","bg-light","bg-light","bg-light"],
              ["bg-light","bg-light","bg-light","bg-light","bg-light","bg-light","bg-light"],
              ["bg-light","bg-light","bg-light","bg-light","bg-light","bg-light","bg-light"],
              ["bg-light","bg-light","bg-light","bg-light","bg-light","bg-light","bg-light"],
              ["bg-light","bg-light","bg-light","bg-light","bg-light","bg-light","bg-light"],
        ],
      blue: false
    };
  }

  render(){
    return(
      <div className="container">
            <h1>Connect4</h1>
            <table class="col-lg-7 table table-dark" align="center">
            <tbody>
              {this.state.board.map((colors,i) =>
                  <tr key={i}>
                     <td onClick={() =>this.game(0)} className={colors[0]}></td>
                     <td onClick={() =>this.game(1)} className={colors[1]}></td>
                     <td onClick={() =>this.game(2)} className={colors[2]}></td>
                     <td onClick={() =>this.game(3)} className={colors[3]}></td>
                     <td onClick={() =>this.game(4)} className={colors[4]}></td>
                     <td onClick={() =>this.game(5)} className={colors[5]}></td>
                     <td onClick={() =>this.game(6)} className={colors[6]}></td>
                  </tr>    
              )}
            </tbody>
          </table>
        </div>
    )
  }

  game(col){
    if(this.state.board[5][col] === "bg-light")
    {
      var board = this.state.board
      board[5][col] = this.state.blue? "bg-primary":"bg-warning";
      this.setState(state =>({
        board:board,
        blue: !state.blue
      }))
    }
    /*let count=0
    console.log(count)
    let color=""
    for(let c=0;c<5;c++)
    {
      if((this.state.board[5][c] === this.state.board[5][c+1]) && this.state.board[5][c] != "bg-light")
      {
        count +=1;
        color = this.state.board[5][c]
      }
      else
      {
        count=0
      }
    }
    console.log(count)
    if(count === 4)
    {
      alert("Win")
    }*/
  }
}

export default App;
