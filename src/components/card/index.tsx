import { FC, memo, useCallback, useId, useState } from 'react';
import { RiExpandLeftRightLine, RiExpandUpDownLine } from 'react-icons/ri';
import { TCardButton, TMergeButton } from '../../lib/types';
import { HiMiniBars2 } from 'react-icons/hi2';

const CardButton: FC<TCardButton> = memo(({ onClick, isHorizontal }) => (
  <button
    className="text-white bg-emerald-500"
    onClick={() => onClick({ isHorizontal })}
  >
    <HiMiniBars2 className={isHorizontal ? '' : 'rotate-90'} size={24} />
  </button>
));

const MergeButton: FC<TMergeButton> = memo(({ isHorizontal, onClick }) => (
  <button
    className="text-white bg-red-500 grid place-items-center"
    onClick={onClick}
  >
    {isHorizontal ? (
      <RiExpandUpDownLine size={32} />
    ) : (
      <RiExpandLeftRightLine size={32} />
    )}
  </button>
));

export const Card: FC = memo(() => {
  const id = useId();
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
      className={`relative w-auto border-2 border-emerald-500 rounded-lg flex justify-center gap-2 ${isHorizontal ? 'flex-row' : 'flex-col'
        } p-4`}
    >
      <div
        className={`flex gap-2 ${isHorizontal ? 'flex-col' : 'flex-row'
          } justify-center`}
      >
        {[1, 2].map((i) => (
          <Card key={`${id}-${Date.now()}-${i}`} />
        ))}
      </div>
      <MergeButton onClick={removeChild} isHorizontal={isHorizontal} />
    </div>
  );
});
