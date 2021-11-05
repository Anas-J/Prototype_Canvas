import React from 'react';
import CardView from './cardView';
import CardViewHeader from './cardViewHeader';
import './index.scss';

// Card Text Paragraph Container
const CardViewRepresentation = (props) => {
  const { data, visible } = props;
  return (
    <article>
      {visible && (
        <header>
          <CardViewHeader header={data?.parentName} />
        </header>
      )}
      <section className="cardViewParagraphTexts">
        <div className="gradientOverlay" />
        <CardView data={data?.dataFormat?.data} />
      </section>
    </article>
  );
};

export default CardViewRepresentation;
