import React from 'react';

const Button = ( prop  ) =>
{
  return <button className={`${prop.class}  rounded-lg`}>{prop.text}</button>;
};

export default Button;
