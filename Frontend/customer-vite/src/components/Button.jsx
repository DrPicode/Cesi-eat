import React from 'react';

const Button = ( prop  ) =>
{
  return <button
      onClick={prop.onClick}
      className={`${prop.class}  rounded-lg`}>{prop.text}</button>;
};

export default Button;
