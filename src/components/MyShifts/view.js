import React from "react";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text``;

export default (props: {
  data: Array<any>, // provided by reduxAutoloader
  error: boolean, // provided by reduxAutoloader
  isLoading: boolean // provided by reduxAutoloader
}) => {
  const { data, error, isLoading } = props;
  console.log("my shifts props", props);
  return (
    <Container>
      <Text>My shifts</Text>
      <Text>{data && data.length}</Text>
      {error && <Text>Error</Text>}
      {isLoading && <Text>LODAIFN</Text>}
    </Container>
  );
};
