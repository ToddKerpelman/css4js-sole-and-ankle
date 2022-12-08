import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

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

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant !== "default" && (
            <Shoetag variant={variant}>
              {variant === "on-sale"
                ? "Sale!"
                : variant === "new-release"
                ? "Just released!"
                : ""}
            </Shoetag>
          )}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price onSale={variant === "on-sale"}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Shoetag = styled.div`
  background-color: ${(props) =>
    props.variant === "on-sale" ? COLORS.primary : COLORS.secondary};
  color: white;
  width: fit-content;
  padding: 7px 9px 9px 11px;
  border-radius: 2px;
  position: absolute;
  top: 12px;
  right: -4px;
  font-weight: 700;
  font-size: 1rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  flex: 1 1 340px;
  border-radius: 16px;
  position: relative;
`;

// I'll note that Josh preferred to put this max-width in a new ShoeWrapper
// property that he added to shoeGrid. That makes it easier to reuse this
// card elsewhere.

// Either way, though, adding the width to the Wrapper and then making the
// image just 100% is a common pattern
const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 16px;
  background-color: ${COLORS.gray[100]};
  height: 312px;
  max-width: 340px;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${(props) => (props.onSale ? COLORS.gray[500] : COLORS.gray[900])};
  text-decoration: ${(props) => (props.onSale ? "line-through" : "inherit")};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
