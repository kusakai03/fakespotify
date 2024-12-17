import React from 'react';
import { Helmet } from 'react-helmet';

export default function SetTitle({title}){
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};
