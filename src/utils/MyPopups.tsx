import { Popup } from "semantic-ui-react";
import React, { PropsWithChildren } from 'react';

type PopupType = {
    content: string;
}

const MyPopup = ({content, children}: PropsWithChildren<PopupType>) => {
    return <Popup inverted content={content} trigger={children} />
}

export default MyPopup;