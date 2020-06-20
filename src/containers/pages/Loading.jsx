import {ClockLoader} from 'react-spinners'
import React,{Component} from 'react'

export class Loading extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading:this.props.loading
        }

    }

    render(){
        if(this.state.loading){
           return (<div className="clock" style={{position:'absolute',zIndex:100000,width:'100vw',height:'100vh',marginLeft:50,marginTop:50,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <ClockLoader size={60} loading={this.state.loading} />
        </div>)
    
        }else{
            return <small></small>
        } 
    }
}