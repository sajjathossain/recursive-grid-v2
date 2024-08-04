export type TCardButton = {
  onClick: (params?: { isHorizontal?: boolean }) => void;
  isHorizontal?: boolean;
};

export type TCardProps =
  | {
    children: true;
    isHorizontal?: boolean;
  }
  | {
    children?: false;
    isHorizontal?: boolean;
  };

export type TMergeButton = {
  onClick: () => void;
  isHorizontal?: boolean;
};
