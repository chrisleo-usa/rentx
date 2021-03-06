import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Container, Header, Steps, Title, Subtitle, Form, FormTitle } from './styles';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableNativeFeedback } from 'react-native';

export const SignUpFirstStep = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const { navigate, goBack } = useNavigation<any>();

  const handleBack = () => {
    goBack();
  }

  const handleNextStep = async () => {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
          .required('CNH é obrigatória'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('Email é obrigatório'),
        name: Yup.string()
          .required('Nome é obrigatório'),
        })

      const data = { name, email, driverLicense};
      await schema.validate(data);
    
      navigate('SignUpSecondStep', { user: data })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } 
      
    }

  }

  return (
    <KeyboardAvoidingView
      behavior='position'
      enabled
    >
      <TouchableNativeFeedback
        onPress={Keyboard.dismiss}
      >
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua {'\n'} conta
          </Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>

            <Input 
              iconName='user'
              placeholder='Nome'
              onChangeText={setName}
              value={name}
            />

            <Input 
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              onChangeText={setEmail}
              value={email}
            />

            <Input 
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>

          <Button
            title='Próximo'
            onPress={handleNextStep}
          />
        </Container>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  );
};
