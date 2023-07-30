import clsx from "clsx";
import { styled } from "styled-components";

export enum EIconSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}
type IconProps = {
  path: string;
  size?: EIconSize;
  alt?: string;
};
export default function Icon(props: IconProps): JSX.Element {
  const { path, alt, size = EIconSize.MEDIUM } = props;
  return <StyledIcon className={clsx("icon", size)} alt={alt} src={path} />;
}

const StyledIcon = styled.img`
  &.${EIconSize.SMALL} {
    width: 16px;
    height: 16px;
  }

  &.${EIconSize.MEDIUM} {
    width: 24px;
    height: 24px;
  }

  &.${EIconSize.LARGE} {
    width: 32px;
    height: 32px;
  }
`;
