import styled from "styled-components";
import Heading from "../ui/Heading";
import RecommendDescription from "../features/Recommendation/RecommendDescription";
import CaptureImage from "../features/Recommendation/CaptureImage";

const StyledRecommendDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

function Recommend() {
  return (
    <StyledRecommendDiv>
      <Heading as="h1">Ready to Listen ?</Heading>
      <RecommendDescription />
      <CaptureImage />
    </StyledRecommendDiv>
  );
}

export default Recommend;
