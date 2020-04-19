import React from "react";
import styled, { keyframes } from "styled-components";

const Root = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const lds1 = keyframes`
 0% {
  transform: scale(0);
 }
 100% {
  transform: scale(1);
 }
`;

const lds2 = keyframes`
 0% {
  transform: translate(0, 0);
 }
 100% {
  transform: translate(24px, 0);
 }
`;

const lds3 = keyframes`
 0% {
  transform: translate(0, 0);
 }
 100% {
  transform: translate(24px, 0);
 }
`;

const Content = styled.div`
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gray.normal};
  animation-timing-function: cubic-bezier(0, 1, 1, 0);

  &:nth-child(1) {
    left: 8px;
    animation: ${lds1} 0.6s infinite;
  }

  &:nth-child(2) {
    left: 8px;
    animation: ${lds2} 0.6s infinite;
  }

  &:nth-child(3) {
    left: 32px;
    animation: ${lds2} 0.6s infinite;
  }

  &:nth-child(4) {
    left: 56px;
    animation: ${lds3} 0.6s infinite;
  }
`;

function LoadingIndicator() {
  return (
    <Root>
      <Content />
      <Content />
      <Content />
      <Content />
    </Root>
  );
}

export default LoadingIndicator;