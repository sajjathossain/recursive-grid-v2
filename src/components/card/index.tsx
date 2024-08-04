import { FC, useCallback, useState } from 'react';

type TCardButton = {
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

const CardButton: FC<TCardButton> = ({ onClick, isHorizontal }) => (
  <button
    className="text-white bg-emerald-500"
    onClick={() => onClick({ isHorizontal })}
  >
    {isHorizontal ? 'h' : 'v'}
  </button>
);

export const Card: FC = () => {
  const [nativeChild, setNativeChild] = useState<boolean>(false);
  const [isHorizontal, setIsHorizontal] = useState(false);

  const addChild = useCallback((params?: { isHorizontal?: boolean }) => {
    const { isHorizontal } = params || {};
    if (isHorizontal) {
      setIsHorizontal(() => true);
    }
    setNativeChild(() => true);
  }, []);

  const removeChild = useCallback(() => {
    setNativeChild(() => false);
    setIsHorizontal(() => false);
  }, []);

  if (!nativeChild) {
    return (
      <div className="w-fit aspect-square grid place-items-center relative p-3 border-2 border-black/20 rounded-lg bg-slate-100">
        <div className="flex gap-2 justify-center items-center">
          <CardButton onClick={addChild} isHorizontal />
          <CardButton onClick={addChild} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-fit border-2 border-emerald-500 rounded-lg flex gap-2 ${
        isHorizontal ? 'flex-row' : 'flex-col'
      } p-4`}
    >
      <div
        className={`flex gap-2 ${
          isHorizontal ? 'flex-col' : 'flex-row'
        } justify-center`}
      >
        {[4, 1].map((i) => (
          <Card key={i * Date.now()} />
        ))}
      </div>
      <button className="text-white bg-red-500" onClick={removeChild}>
        x
      </button>
    </div>
  );
};
