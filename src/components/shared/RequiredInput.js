import React from 'react';

import FormInput from './FormInput';

const RequiredInput = (props) => (
    <FormInput
        validator={(value) => value}
        {...props}
    />
);

export default RequiredInput;
