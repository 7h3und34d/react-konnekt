import * as React from 'react';

interface HooksToPropsFunction<OwnProps, Props> {
  (ownProps: OwnProps): Props;
}

export function Konnekt<OwnProps, Props>(
  hooksToProps: HooksToPropsFunction<OwnProps, Props>
) {
  return function(Component: React.ComponentType<OwnProps & Props>) {
    return function(props: OwnProps) {
      const hooksProps = hooksToProps(props);
      return <Component {...props} {...hooksProps} />;
    };
  };
}
