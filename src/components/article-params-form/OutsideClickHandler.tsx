import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { RefObject } from 'react';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onChange: (val: boolean) => void;
	rootRef: RefObject<HTMLDivElement>;
};

export const OutsideClickHandler = ({
	isOpen,
	onClose,
	onChange,
	rootRef,
}: Props) => {
	useOutsideClickClose({ isOpen, onClose, onChange, rootRef });
	return null;
};
