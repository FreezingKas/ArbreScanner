import React from 'react';
import { StyleSheet, View, Dimensions, setError, setValid, __isValidEmail } from 'react-native';
import Modal from 'react-native-modal';
import { Title, IconButton, Menu, Divider, Provider } from 'react-native-paper';
import FormInput from '../Components/FormInput';
import FormButton from '../Components/FormButton';

import * as firebase from 'firebase';
import firebaseConfig from '../helpers/firebase'

firebase.initializeApp(firebaseConfig)



export default class MyMap extends React.Component {
    constructor(props) {
        super(props)
        state = {
            pass: "",
            email: "",
        }
    }

    __doSignUp = () => {
        
      
        this.__doCreateUser(this.state.email, this.state.pass)
      }
      
    __doCreateUser = async (email, password) => {
        try {
          let response = await firebase.auth().createUserWithEmailAndPassword(email, password)
          if (response) {
            console.log( "🍎", response)
          }
        } catch (e) {
          console.error(e.message)
        }
      }

    

    render() {
        return (
            <View>
                <Modal isVisible={this.props.state} useNativeDriver={true} style={styles.modalContainerView} onBackdropPress={() => this.toggleModal(false)}>
                    <View style={styles.containerView}>
                        <View style={styles.containerView1}>
                            <Title style={styles.titleText}>Bienvenue !</Title>
                            <FormInput
                                labelName='Email'
                                autoCapitalize='none'
                                onChangeText={(text) => this.setState({email:text})}
                                theme={{ colors: { primary: 'green', underlineColor: 'green', } }}
                                underlineColor={('green')}
                            />
                            <FormInput
                                labelName='Mot de passe'
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({pass:text})}
                                theme={{ colors: { primary: 'green', underlineColor: 'green', } }}
                                underlineColor={('green')}
                            />
                            <FormButton
                                title='Connexion'
                                modeValue='contained'
                                labelStyle={styles.loginButtonLabel}
                                onPress={() => this.__doSignUp()}
                                color={'green'}
                            />
                            <FormButton
                                title='Nouveau ici ?'
                                modeValue='text'
                                uppercase={false}
                                labelStyle={styles.navButtonText}
                                onPress={() => console.log("Inscription")}
                                color={'green'}
                            />
                            <IconButton icon="arrow-down-thick" color={'green'} size={30} onPress={this.props.funcToggle} />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

}
const styles = StyleSheet.create({
  modalContainerView: {
    backgroundColor: "white",
    marginTop: '40%',
    borderRadius: 10,
    maxHeight: Dimensions.get('window').height / 2
  },
  containerView: { flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerView1: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    titleText: {
        fontSize: 24,
        marginBottom: 10,
        marginTop: 15
    },
    loginButtonLabel: {
        fontSize: 22
    },
    navButtonText: {
        fontSize: 16
    }
})
