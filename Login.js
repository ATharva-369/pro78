import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ToastAndroid, Alert, Modal,ScrollView } from 'react-native';
import db from './config'
import firebase from 'firebase'
// import SantaAnimation from '../components/SantaClaus';

export default class Login extends React.Component {
    constructor(){
        super();
        this.state={
        email:'',
        password:'',
        modalVisible:false,
        firstName:'',
        lastName:'',
        contact:'',
        address:'',
        confirmPassword:''
        }
    }
    modalForm = ()=>{
        return(
            <Modal style={style.modalView} animationType='fade' transparent={false} visible={this.state.modalVisible}>
                <View>
                    <ScrollView style={{width:'100%'}}>
                <KeyboardAvoidingView>
                    <Text style={{textAlign:'center',fontSize:30}}>Registration</Text>
                    <TextInput style={style.input} placeholder="First Name" maxLength={25} onChangeText={(t)=>{
                        this.setState({
                            firstName:t
                        })
                    }}/>
                    <TextInput style={style.input} placeholder="Last Name" maxLength={25} onChangeText={(t)=>{
                        this.setState({
                            lastName:t
                        })
                    }}/>                    
                 <TextInput style={style.input} placeholder="Phone number" keyboardType='number-pad' maxLength={10} onChangeText={(t)=>{
                        this.setState({
                            contact:t
                        })
                    }}/>
                 <TextInput style={style.input} placeholder="Address" multiline={true} onChangeText={(t)=>{
                        this.setState({
                            address:t
                        })
                    }}/>  
                <TextInput style={style.input} placeholder="Email" keyboardType='email-address' onChangeText={(t)=>{
                        this.setState({
                            email:t
                        })
                    }}/>      
                    <TextInput  style={style.input} placeholder="Password" maxLength={25} secureTextEntry={true} keyboardType='default' onChangeText={(t)=>{
                        this.setState({
                            password:t
                        })
                    }}/>       
                    <TextInput style={style.input} placeholder="Comfirm Password" maxLength={25} secureTextEntry={true} onChangeText={(t)=>{
                        this.setState({
                            confirmPassword:t
                        })
                    }}/> 
                <TouchableOpacity style={style.button} onPress={()=>{
                        this.signup(this.state.email,this.state.password,this.state.confirmPassword);
                    }
                }>
                    <Text>
                        Register
                    </Text>  
                    </TouchableOpacity>                  
                <TouchableOpacity style={style.button} onPress={()=>{
                    this.setState({
                        modalVisible:false
                    })
                }}>
                    <Text>
                        Cancel
                    </Text>
                    </TouchableOpacity>                                                        
                </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }   

    login = async (e,p)=>{
        if(e&&p){
            try {
              const RESPONSE = await firebase.auth().signInWithEmailAndPassword(e,p)  
              if(RESPONSE){
                  Alert.alert("Successfully logged in");
              }
            } catch (error) {
                switch(error.code){
                    case 'auth/user-not-found': Alert.alert('User does not exist')
                    break;
                    case 'auth/invalid-email':Alert.alert('Invalid email')
                    break;
                }
            }
        }
        else{
            Alert.alert('Kindly enter email-address and password')
        }
    }
    signup = async (e,p,cp)=>{
        if(p!==cp){
            return(
                Alert.alert('Passwords not matching')
            )
        }
        else{

        
        firebase.auth().createUserWithEmailAndPassword(e,p).then((r)=>{
            db.collection('users').add({
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                contact:this.state.contact,
                email:this.state.email,
                password:this.state.password
            })
            return Alert.alert("User Added Successfully",'',[{
                text:'OK',onPress:()=>{
                    this.setState({
                        modalVisible:false
                    })
                }
            }]);
        })
        .catch(function(error){
            var ec = error.code;
            var em = error.message;
            return Alert.alert(em);
        })
    }
    }
   render(){
       return(
           <View style={{   flex: 1,
            justifyContent: "center",
            alignItems: "center",marginTop:100}}>
                              {this.modalForm()}
               <TextInput style={style.input} placeholder='Enter your email-address' keyboardType='email-address' onChangeText={(t)=>{
                   this.setState({
                       email:t
                   })
               }}/>
               <TextInput style={style.input} placeholder='Enter your password' keyboardType='default' secureTextEntry={true} onChangeText={(t)=>{
                   this.setState({
                       password:t
                   })
               }}/>
               <TouchableOpacity style={style.button} onPress={()=>{
                   this.login(this.state.email,this.state.password);
               }}>
                   <Text style={{ color:'white'}}>Login</Text>
               </TouchableOpacity>
               <TouchableOpacity style={style.button} onPress={()=>{
                   this.setState({
                       modalVisible:true
                   })
               }}>
                   <Text style={{color:'white'}}>Signup</Text>
               </TouchableOpacity>
            </View>
       )
   } 
}
const style = StyleSheet.create({
    input:{
        color:'green',
        fontSize:20,
        marginTop:50
    },
    button:{
        alignItems:'center',
        backgroundColor:'green',
        marginTop:50,
        width:70,
        marginHorizontal:'50%'
        

    },
    modalView: {
        margin: 20,
        color:'#15BDD8',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowOffset: {
          width: 0,
          height: 2
        }
    }
        

})