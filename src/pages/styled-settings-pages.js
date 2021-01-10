import styled from "styled-components";

export const SettingsPageContainer = styled.div`
    display: grid;
    grid-template-columns: 500px auto 575px;
    grid-template-areas:
    "graph    graph    right"
    "navigate vidgets  right";
    > div:nth-child(1) {
    grid-area: graph;
    }
    > div:nth-child(2) {
    grid-area: navigate;
    }
    > div:nth-child(3) {
    grid-area: vidgets;
    display: flex;
    justify-content: center;
        >div{
        margin: 20px;
        }
    }
    > div:nth-child(4) {
    grid-area: right;
    }
`;


