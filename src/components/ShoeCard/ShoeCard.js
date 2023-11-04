import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  console.log(variant)
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price salePrice={salePrice}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      {variant && variant === 'new-release' && <SalesNew>Just released</SalesNew>} 
      {variant && variant === 'on-sale' && <SalesDiscount>Sale</SalesDiscount>} 
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex-basis: 235px;
  flex-grow: 1;
  flex-shrink: 1;
  max-width: 378px;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
`;

const ImageWrapper = styled.div`
  border-radius: 16px 16px 4px 4px;
  
  /* hiding overflow to cut rounded border from image */
  overflow: hidden;
  position: relative;
  object-fit: cover;
  background-color: ${COLORS.gray[100]};
`;

const Image = styled.img`
  width: 100%; 
  object-fit: scale-down;
`;

const SalesTag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  color: ${COLORS.white}; 
  font-size: 0.875rem;
  font-weight: ${WEIGHTS.bold};
  border-radius: 2px;
  padding: 7px 9px 9px 10px;
`

const SalesNew = styled(SalesTag)`
  background-color: ${COLORS.secondary};
`
const SalesDiscount = styled(SalesTag)`
  background-color: ${COLORS.primary};
`

const Row = styled.div`
  font-size: 1rem;
  flex-shrink: 1;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${p => p.salePrice ? 'line-through' : 'none'};
  color: ${p => p.salePrice ? COLORS.gray[700] : 'inherit'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
