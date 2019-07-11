import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      greeting: ''
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleregEmail = this.handleregEmail.bind(this);
    this.handleloginEmail = this.handleloginEmail.bind(this);

  }


  handleSubmit(page,user) {
    fetch(`/api/greeting?name=${encodeURIComponent(page)}&user=${encodeURIComponent(user)}`)
      .then(response => response.json())
      .then(res => this.setState({

        greeting:res

      }
    
    ,()=>console.log(this.state.greeting.greeting)
      ) );
  }


  handleregEmail(event){
event.preventDefault();
    this.setState({

      regEmail:event.target.value

    },()=>console.log(this.state.regEmail))

  }


  handleloginEmail(event){
    event.preventDefault();
        this.setState({
    
          loginEmail:event.target.value
    
        },()=>console.log(this.state.loginEmail))
    
      }

  render() {

    let r = Math.random().toString(36).substring(7);
console.log(r);
    return (
      <div className="App">
     

      <h1 className="myheader">Erabia Page Crawler (Automated Test)</h1>

     <div className="mycontainer">

      <div className="listItem">
        
          <h3  className="myheader"> Register Page</h3>

          <p style={{color:"white",fontStyle:"italic"}}>Note: If no email is provided; a random one will be generated!</p>

          <form>

            <input className="inputs_x" onChange={this.handleregEmail}  value={this.state.regEmail} placeholder="email"/>

          </form>

          <button style={{padding:"10px",borderRadius:"10px"}} onClick={()=>this.handleSubmit("reg",this.state.regEmail)}>Rgister Page</button>

      </div>
       
      <div className="listItem">
      <h3  className="myheader"> Login Page</h3>

      <p style={{color:"white",fontStyle:"italic"}}>Note: If no email is provided; a default one will be used!</p>

  <form>

  <input className="inputs_x" onChange={this.handleloginEmail}  value={this.state.loginEmail} placeholder="email"/>

  </form>


      <button style={{padding:"10px",borderRadius:"10px"}} onClick={()=>this.handleSubmit("login",this.state.loginEmail)}>Login Page</button>

      </div>

      <div className="listItem">
      <h3  className="myheader"> -- Page</h3>
      <button style={{padding:"10px",borderRadius:"10px"}} onClick={()=>this.handleSubmit("--")}>-- Page</button>

      </div>
  

     </div>

      </div>
    );
  }

}



export default App;
