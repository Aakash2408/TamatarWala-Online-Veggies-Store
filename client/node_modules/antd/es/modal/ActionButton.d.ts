import * as React from 'react';
import { LegacyButtonType, ButtonProps } from '../button/button';
export interface ActionButtonProps {
    type?: LegacyButtonType;
    actionFn?: (...args: any[]) => any | PromiseLike<any>;
    closeModal: Function;
    autoFocus?: boolean;
    buttonProps?: ButtonProps;
}
declare const ActionButton: React.FC<ActionButtonProps>;
export default ActionButton;
