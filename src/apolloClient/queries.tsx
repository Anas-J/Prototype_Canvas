import { gql } from '@apollo/client';

const reportQuery = gql`
  {
    reports {
      name
      id
      leftNavName
      cardsView {
        L1View
        L1Text
        L1Footer
        L2View
        DataType
        parentId
        tagName
        tagDescription
        parentName
        L2Name
        id
        dataFormat {
          data {
            header1
            header2
            header3
            header4
            header5
            header6
            header7
            value1
            value2
            value3
            value4
            value5
            value6
            value7
          }
        }
      }
    }
  }
`;

export default reportQuery;
