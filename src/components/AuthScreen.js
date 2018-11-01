import React from 'react';
import {connect} from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Left,
    Body,
    Text,
    Form,
    Item,
    Label,
    Input,
    Right,
    Spinner
} from 'native-base';
import {View, Alert} from 'react-native';
import {tryAuth, fetchExpenses} from '../hasuraApi';
import {storeSession} from '../action';

class AuthScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailTextBox: '',
            passwordTextBox: ''
        }
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
    }

    handleLoginPressed = async () => {
        const resp = await tryAuth(this.state.emailTextBox, this.state.passwordTextBox, "login");
        if (resp.status === 503) {
            Alert.alert("Network Error", "Please check your internet connection");
        } else {
            var respBody = await resp.json();

            if ("SUCCESS" === respBody.severity) {
                const session = {
                    token: respBody.data.token
                };
                await storeSession(session);
                this.props.dispatch({type: 'TOGGLE_EXPENSE', session});
            } else {
                let message = respBody.message + ": " + respBody.data.message;
                Alert.alert("Unauthorized", message);
            }
        }
    }

    handleSignupPressed = async () => {
        const resp = await tryAuth(this.state.emailTextBox, this.state.passwordTextBox, "register");
        if (resp.status === 503) {
            Alert.alert("Network Error", "Please check your internet connection");
        } else {
            var respBody = await resp.json();
            console.log(respBody);
            if ("SUCCESS" !== respBody.severity) {
                Alert.alert("Error", respBody.message);
            } else {
                await this.handleLoginPressed();
            }
        }
    }

    handleEmailChange = (emailTextBox) => {
        this.setState({
            ...this.state,
            emailTextBox: emailTextBox
        })
    }

    handlePasswordChange = (passwordTextBox) => {
        this.setState({
            ...this.state,
            passwordTextBox: passwordTextBox
        })
    }

    render() {
        if (this.state.loading === true) {
            return (
                <Container>
                    <Header/>
                    <Content>
                        <Spinner/>
                    </Content>
                </Container>
            );
        } else {
            return (
                <Container>
                    <Header>
                        <Left/>
                        <Body>
                        <Title> Login </Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Content contentContainerStyle={{justifyContent: 'center', margin: 20}}>
                        <Form>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input value={this.state.emailTextBox} onChangeText={this.handleEmailChange}/>
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input value={this.state.passwordTextbox} onChangeText={this.handlePasswordChange}
                                       secureTextEntry/>
                            </Item>
                        </Form>
                        <View style={{height: 10}}/>
                        <Button block onPress={this.handleSignupPressed}>
                            <Text> Sign up </Text>
                        </Button>
                        <View style={{height: 10}}/>
                        <Button block title="Log in" onPress={this.handleLoginPressed}>
                            <Text> Log in </Text>
                        </Button>
                    </Content>
                </Container>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        session: state.session,
    };
}

export default connect(mapStateToProps)(AuthScreen);
