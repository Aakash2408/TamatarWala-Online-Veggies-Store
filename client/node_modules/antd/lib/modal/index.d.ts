import OriginModal from './Modal';
import { ModalStaticFunctions } from './confirm';
export { ActionButtonProps } from './ActionButton';
export { ModalProps, ModalFuncProps } from './Modal';
declare type Modal = typeof OriginModal & ModalStaticFunctions & {
    destroyAll: () => void;
};
declare const Modal: Modal;
export default Modal;
