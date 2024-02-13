import React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import Navbar from './NavBar'; 

const Container = styled.div`
  text-align: center;
  padding: 50px;
  color: white;
  background-color: #000; 
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Question = styled(animated.h3)`
  margin: 20px 0;
`;

const Answer = styled(animated.p)`
  color: #bbb;
  max-width: 600px;
`;

const About = () => {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

  const faqs = [
    { question: 'Who are we?', answer: 'We are a team dedicated to bringing you the best ZKP products.' },
    { question: 'What is authenticaster?', answer: 'Authenticaster is a service that tell you your reliability score in the farcaster ecosystem.' },
    { question: 'What is authenticaster?', answer: 'Authenticaster is a service that tell you your reliability score in the farcaster ecosystem.' },
    { question: 'What is authenticaster?', answer: 'Authenticaster is a service that tell you your reliability score in the farcaster ecosystem.' },
   

  ];

  return (
    <>
      <Navbar />
      <Container>
        {faqs.map((faq, index) => (
          <div key={index}>
            <Question style={fade}>{faq.question}</Question>
            <Answer style={fade}>{faq.answer}</Answer>
          </div>
        ))}
      </Container>
    </>
  );
};

export default About;
